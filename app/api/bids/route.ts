import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import { NFT } from "@/app/backend/models/nft";
import { Notification } from "@/app/backend/models/notifications";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { BidSchema, updateBidSchema } from "@/app/backend/zodschemas/bids";
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

export async function PATCH(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const body = await req.json();
  const result = updateBidSchema.safeParse(body);

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

  const { _id, status } = result.data;

  try {
    await dbConnect();

    // Find the bid and its associated NFT
    const bid = await Bid.findById(_id).populate("nft");
    if (!bid) {
      return NextResponse.json(
        {
          data: null,
          error: "Bid not found",
          message: "The bid you are trying to update does not exist",
        },
        { status: 404 }
      );
    }

    const nft = bid.nft;
    if (!nft) {
      return NextResponse.json(
        {
          data: null,
          error: "NFT not found",
          message: "Associated NFT not found",
        },
        { status: 404 }
      );
    }

    // Only allow accept/reject if bid is currently active and NFT owner is making the request
    // (Assuming you have auth middleware or can check via context; here we assume `req.user` exists)
    // Adjust this check based on your auth setup
    // if (req.user?.id !== nft.owner.toString()) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    if (bid.status !== "active") {
      return NextResponse.json(
        {
          data: null,
          error: "Invalid bid state",
          message: "Only active bids can be accepted or rejected",
        },
        { status: 400 }
      );
    }

    // Handle REJECT
    if (status === "reject") {
      await Bid.findByIdAndUpdate(_id, { status: "rejected" });

      // Notify bidder
      const notification = {
        type: "warning",
        action: "bid",
        title: "Bid Rejected",
        message: `Your bid of ${bid.amount} ETH on "${nft.title}" was rejected by the owner.`,
        recipient: bid.bidder,
        data: {
          refType: "Nft",
          refId: nft._id,
        },
      };

      await Notification.create(notification);

      return NextResponse.json(
        {
          data: { _id, status: "rejected" },
          error: null,
          message: "Bid rejected successfully",
        },
        { status: 200 }
      );
    }

    // Handle ACCEPT
    if (status === "accept") {
      // 1. Mark this bid as accepted
      await Bid.findByIdAndUpdate(_id, { status: "accepted" });

      // 2. Mark all other active bids as outbid (or rejected?)
      await Bid.updateMany(
        {
          nft: nft._id,
          _id: { $ne: _id },
          status: "active",
        },
        { $set: { status: "lost" } }
      );

      // 3. Update NFT: set current_bid to accepted amount, but DO NOT clear bids yet
      //    (We'll clear bids & end auction only when purchase is confirmed)
      await NFT.updateOne(
        { _id: nft._id },
        {
          $set: {
            current_bid: bid.amount,
            // auction_end_time remains as-is for now
            // bids array remains intact until purchase
          },
        }
      );

      // 4. Get all outbid bidders to notify them
      const outbidBids = await Bid.find({
        nft: nft._id,
        _id: { $ne: _id },
        status: "outbid",
      });

      const outbidNotifications = outbidBids.map((b) => ({
        type: "warning",
        action: "auction",
        title: "Auction Closed",
        message: `The auction for "${nft.title}" has closed. Your bid of ${b.amount} ETH was not accepted.`,
        recipient: b.bidder,
        data: {
          refType: "Nft",
          refId: nft._id,
        },
      }));

      // 5. Notify the winning bidder
      const winnerNotification = {
        type: "success",
        action: "bid",
        title: "Bid Accepted!",
        message: `Congratulations! Your bid of ${bid.amount} ETH on "${nft.title}" was accepted. Please complete the purchase.`,
        recipient: bid.bidder,
        data: {
          refType: "Nft",
          refId: nft._id,
          bidId: bid._id,
        },
      };

      // 6. Notify owner (optional, if they want confirmation)
      const ownerNotification = {
        type: "info",
        action: "bid",
        title: "Bid Accepted",
        message: `You accepted a bid of ${bid.amount} ETH on your NFT "${nft.title}". Awaiting purchase completion.`,
        recipient: nft.owner,
        data: {
          refType: "Nft",
          refId: nft._id,
        },
      };

      const allNotifications = [
        ...outbidNotifications,
        winnerNotification,
        ownerNotification,
      ];

      if (allNotifications.length > 0) {
        await Notification.insertMany(allNotifications);
      }

      return NextResponse.json(
        {
          data: {
            _id,
            status: "accepted",
            acceptedBid: bid,
            nft: nft._id,
          },
          error: null,
          message: "Bid accepted and auction closed for new bids",
        },
        { status: 200 }
      );
    }

    // Invalid status
    return NextResponse.json(
      {
        data: null,
        error: "Invalid status",
        message: 'Status must be either "accept" or "reject"',
      },
      { status: 400 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Failed to update bid";
    return NextResponse.json(
      {
        data: null,
        error: errMessage,
        message: "Something went wrong updating bid",
      },
      { status: 500 }
    );
  }
}
