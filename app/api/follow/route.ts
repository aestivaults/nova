import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Follow } from "@/app/backend/models/follow";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;
  try {
    const decoded = await requireAuth(req);
    if (decoded instanceof NextResponse) {
      return decoded;
    }

    await dbConnect();

    const { followingId } = await req.json();

    if (!followingId) {
      return NextResponse.json(
        { error: "Missing followingId" },
        { status: 400 }
      );
    }

    if (decoded._id.toString() === followingId) {
      return NextResponse.json(
        { error: "You cannot follow yourself" },
        { status: 400 }
      );
    }

    const existing = await Follow.findOne({
      follower: decoded._id,
      following: followingId,
    });

    if (existing) {
      // Unfollow
      await Follow.deleteOne({ _id: existing._id });
      return NextResponse.json({ following: false, message: "Unfollowed" });
    } else {
      await Follow.create({
        follower: decoded._id,
        following: followingId,
      });
      return NextResponse.json({ following: true, message: "Followed" });
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
