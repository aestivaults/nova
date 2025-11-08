import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
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

    const Bids = await Bid.find({ bidder: decoded._id })
      .populate({
        path: "nft",
        populate: [{ path: "owner", select: "_id" }],
      })
      .populate("bidder")
      .lean();

    return NextResponse.json({
      data: Bids,
      error: null,
      message: "bids fetched successfully",
    });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to fetch user bids";
    return NextResponse.json({
      data: null,
      error: errMessage,
      message: "something went wrong",
    });
  }
}
