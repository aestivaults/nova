import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import { NFT } from "@/app/backend/models/nft";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { BidSchema } from "@/app/backend/zodschemas/bids";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const body = await req.json();
  const result = BidSchema.safeParse(body);

  if (!result.success) {
    const formatted = treeifyError(result.error);
    return NextResponse.json(
      {
        data: null,
        error: formatted.properties,
        message: "Invalid input data",
      },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const bid = await Bid.insertOne(result.data);
    await NFT.updateOne(
      { _id: result.data.nft },
      { $push: { bids: bid._id }, current_bid: result.data.amount }
    );

    return NextResponse.json(
      {
        data: bid,
        error: null,
        message: "Bid inserted successfuly",
      },
      { status: 201 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to insert bid";
    return NextResponse.json({
      data: null,
      errror: errMessage,
      message: "something went wrong inserting bid",
    });
  }
}

export async function GET(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  try {
    await dbConnect();
    const bids = await Bid.find()
      .populate({
        path: "nft",
        match: { owner: decoded._id }, // filter NFTs owned by current user
      })
      .populate("bidder")
      .exec();

    const filteredBids = bids.filter((bid) => bid.nft !== null);

    return NextResponse.json({
      data: filteredBids,
      error: null,
      message: "User's NFT bids retrieved successfully",
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      error: error instanceof Error ? error.message : "Failed to fetch bids",
      message: "Failed to fetch bids",
    });
  }
}
