import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import { NFT } from "@/app/backend/models/nft";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const decoded = await requireAuth(req);
    if (decoded instanceof NextResponse) {
      return decoded;
    }

    await dbConnect();

    // Step 1: Find NFTs owned by the user
    const userNFTs = await NFT.find({ owner: decoded._id }).select("_id");

    const nftIds = userNFTs.map((nft) => nft._id);

    if (nftIds.length === 0) {
      return NextResponse.json({
        data: [],
        error: null,
        message: "No NFTs owned by user, so no bids received",
      });
    }

    // Step 2: Find bids made to these NFTs
    const bids = await Bid.find({ nft: { $in: nftIds } })
      .populate({
        path: "nft",
      })
      .populate({
        path: "bidder",
        select: "username email", // Adjust fields as needed
      })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      data: bids,
      error: null,
      message: "Fetched bids received on user's NFTs successfully",
    });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Failed to fetch received bids";

    return NextResponse.json(
      {
        data: null,
        error: errMessage,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
