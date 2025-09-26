// app/api/nfts/route.ts
import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import { Collection } from "@/app/backend/models/collection";
import { Like } from "@/app/backend/models/likes";
import { NFT } from "@/app/backend/models/nft";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { CollectionPayload } from "@/app/types/collection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(req);

  const { id } = await context.params;

  await dbConnect();

  await NFT.find();
  await User.find();
  await Bid.find();
  const collection = await Collection.findById(id)
    .populate("creator", "username avatar email name") // populate with specific user fields
    .populate("owner", "username avatar email name") // optional field
    .populate("owners", "username avatar email name") // array of user references
    .populate({
      path: "nfts",
      populate: [
        { path: "creator", select: "username avatar email name" },
        { path: "owner", select: "username avatar email name" },
        {
          path: "bids",
          populate: {
            path: "bidder",
            select: "username avatar email name",
          },
          options: { limit: 5 },
        },
      ],
    })
    .lean<CollectionPayload>();

  if (!collection) {
    return NextResponse.json(
      {
        data: null,
        error: "Collection doesn't exist",
        message: "Collection does not exist",
      },
      { status: 200 }
    );
  }

  if (!decoded || decoded instanceof NextResponse) {
    return NextResponse.json(
      {
        data: { ...collection, isLiked: false },
        error: null,
        message: "NFT retrieved successfully",
      },
      { status: 200 }
    );
  }

  const isLike = await Like.findOne({
    user: decoded._id,
    itemId: collection._id,
    itemType: "Collection",
  }).lean();

  const enrichedCollection = {
    ...collection,
    isLiked: isLike ? true : false,
  };

  return NextResponse.json(
    {
      data: enrichedCollection,
      error: null,
      message: "NFT retrieved successfully",
    },
    { status: 200 }
  );
}
