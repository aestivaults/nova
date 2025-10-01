import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import { NFT } from "@/app/backend/models/nft";
import { Notification } from "@/app/backend/models/notifications";
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

    const newBidData = result.data;

    // 1. Insert the new bid
    const bid = await Bid.create(newBidData);

    const nftDoc = await NFT.findById(newBidData.nft).select("owner");

    if (!nftDoc) {
      return NextResponse.json(
        {
          data: null,
          error: "NFT not found",
          message: "Cannot place bid on a non-existent NFT",
        },
        { status: 404 }
      );
    }

    // 2. Update NFT current bid
    await NFT.updateOne(
      { _id: newBidData.nft },
      {
        $push: { bids: bid._id },
        $set: { current_bid: newBidData.amount },
      }
    );

    // 3. Find all *other* active bids for the same NFT
    const outbidBids = await Bid.find({
      nft: newBidData.nft,
      _id: { $ne: bid._id },
      status: "active",
    });

    // 4. Mark them as outbid
    await Bid.updateMany(
      {
        nft: newBidData.nft,
        _id: { $ne: bid._id },
        status: "active",
      },
      { $set: { status: "outbid" } }
    );

    // 5. Create notifications for outbid users
    const outbidNotifications = outbidBids.map((b) => ({
      type: "warning",
      action: "bid",
      title: "You’ve been outbid!",
      message: `Another user placed a higher bid of ${newBidData.amount} ETH.`,
      recipient: b.bidder,
      data: {
        refType: "Nft",
        refId: newBidData.nft,
      },
    }));

    const ownerNotification =
      nftDoc.owner.toString() !== newBidData.bidder.toString()
        ? [
            {
              type: "info",
              action: "bid",
              title: "New Bid Received",
              message: `Your NFT has received a new bid of ${newBidData.amount} ETH.`,
              recipient: nftDoc.owner,
              data: {
                refType: "Nft",
                refId: newBidData.nft,
              },
            },
          ]
        : [];

    const allNotifications = [...outbidNotifications, ...ownerNotification];

    if (allNotifications.length > 0) {
      await Notification.insertMany(allNotifications);
    }

    return NextResponse.json(
      {
        data: bid,
        error: null,
        message: "Bid inserted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Failed to insert bid";
    return NextResponse.json(
      {
        data: null,
        error: errMessage,
        message: "Something went wrong inserting bid",
      },
      { status: 500 }
    );
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
