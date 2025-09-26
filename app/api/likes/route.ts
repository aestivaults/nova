import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Like } from "@/app/backend/models/likes";
import { NFT } from "@/app/backend/models/nft";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;
  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  try {
    const { itemId, itemType } = await req.json();

    if (!itemId || !itemType) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }
    await dbConnect();
    const existing = await Like.findOne({
      user: decoded._id,
      itemId,
      itemType,
    });

    if (existing) {
      // Unlike
      await Like.deleteOne({ _id: existing._id });
      await NFT.updateOne({ _id: itemId }, { $inc: { likes_count: -1 } });
      return NextResponse.json({
        liked: false,
        message: "Unliked successfully",
      });
    } else {
      // Like
      await Like.create({
        user: decoded._id,
        itemId,
        itemType,
      });
      await NFT.updateOne({ _id: itemId }, { $inc: { likes_count: 1 } });
      return NextResponse.json({ liked: true, message: "Liked successfully" });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong",
        message: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}
