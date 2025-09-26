import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Like } from "@/app/backend/models/likes";
import { NFT } from "@/app/backend/models/nft";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
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

    const likes = await Like.find({
      user: decoded._id,
      itemType: "NFT",
    }).lean();

    const likedItemIds = likes.map((like) => like.itemId);

    if (!likedItemIds.length) {
      return NextResponse.json({
        data: [],
        error: null,
        message: "No liked NFTs found",
      });
    }

    // 2. Fetch NFTs by itemId
    const likedNfts = await NFT.find({ _id: { $in: likedItemIds } }).lean();

    const enriched = likedNfts.map((nft) => ({
      ...nft,
      isLiked: true,
    }));

    return NextResponse.json({
      data: enriched,
      error: null,
      message: "Liked NFTs fetched successfully",
    });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Failed to fetch liked NFTs";
    return NextResponse.json({
      data: null,
      error: errMessage,
      message: "Something went wrong",
    });
  }
}
