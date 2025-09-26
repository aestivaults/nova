import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const rateLimitResponse = await limitRequest(request);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(request);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  try {
    await dbConnect();

    // Fetch all bids, populate nft and bidder info
    const bids = await Bid.find().populate("nft").populate("bidder").exec();

    return NextResponse.json({
      data: bids,
      error: null,
      message: "All bids retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      error: error instanceof Error ? error.message : "Failed to fetch bids",
      message: "Failed to fetch bids",
    });
  }
}
