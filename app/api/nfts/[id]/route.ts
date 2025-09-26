// app/api/nfts/route.ts
import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import { Like } from "@/app/backend/models/likes";
import { NFT } from "@/app/backend/models/nft";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NftPayload } from "@/app/types/nftTypes";
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

  await Bid.find();
  const nft = await NFT.findById(id)
    .populate([
      "creator",
      "owner",
      {
        path: "bids",
        populate: {
          path: "bidder",
        },
      },
    ])
    .lean<NftPayload>();

  if (!nft) {
    return NextResponse.json(
      {
        data: null,
        error: "NFT doesn't exist",
        message: "NFT does not exist",
      },
      { status: 200 }
    );
  }

  if (!decoded || decoded instanceof NextResponse) {
    const enrichedNft = {
      ...nft,
      isLiked: false,
    };

    return NextResponse.json(
      {
        data: enrichedNft,
        error: null,
        message: "NFT retrieved successfully",
      },
      { status: 200 }
    );
  }

  const isLike = await Like.findOne({
    user: decoded._id,
    itemId: nft._id,
    itemType: "NFT",
  }).lean();

  const enrichedNft = {
    ...nft,
    isLiked: isLike ? true : false,
  };

  return NextResponse.json(
    {
      data: enrichedNft,
      error: null,
      message: "NFT retrieved successfully",
    },
    { status: 200 }
  );
}
