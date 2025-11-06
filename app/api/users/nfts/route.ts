import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Like } from "@/app/backend/models/likes";
import { NFT } from "@/app/backend/models/nft";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NftPayload } from "@/app/types/nftTypes";
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

    const ownernfts = await NFT.find({ owner: decoded._id })
      .populate({
        path: "owner",
        select: "_id name avatar",
      })
      .populate({
        path: "creator",
        select: "_id name avatar",
      })
      .lean<NftPayload[]>();

    const nftIds = ownernfts.map((n) => n._id);

    const userLikes = await Like.find({
      user: decoded._id,
      itemId: { $in: nftIds },
      itemType: "NFT",
    }).lean();

    const likedMap = new Set(userLikes.map((like) => like.itemId.toString()));

    const enriched = ownernfts.map((nft) => ({
      ...nft,
      isLiked: likedMap.has(nft._id.toString()),
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
