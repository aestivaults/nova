import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Collection } from "@/app/backend/models/collection";
import { Like } from "@/app/backend/models/likes";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { CollectionPayload } from "@/app/types/collection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  try {
    await dbConnect();

    const ownerCollections = await Collection.find({ owner: decoded._id }).lean<
      CollectionPayload[]
    >();

    const collectionids = ownerCollections.map((n) => n._id);

    const userLikes = await Like.find({
      user: decoded._id,
      itemId: { $in: collectionids },
      itemType: "Collection",
    }).lean();

    const likedMap = new Set(userLikes.map((like) => like.itemId.toString()));

    const enriched = ownerCollections.map((nft) => ({
      ...nft,
      isLiked: likedMap.has(nft._id.toString()),
    }));

    return NextResponse.json({
      data: enriched,
      error: null,
      message: "user collections fetched successfully",
    });
  } catch (error) {
    const errMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch user collections";
    return NextResponse.json({
      data: null,
      error: errMessage,
      message: "Something went wrong",
    });
  }
}
