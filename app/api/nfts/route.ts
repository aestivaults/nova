// app/api/nfts/route.ts
import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import { Collection } from "@/app/backend/models/collection";
import { Like } from "@/app/backend/models/likes";
import { NFT } from "@/app/backend/models/nft";
import { Notification } from "@/app/backend/models/notifications";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { buynftSchema, nftInputSchema } from "@/app/backend/zodschemas/nft";
import { NftPayload } from "@/app/types/nftTypes";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";
import { emailService } from "../mail/mail";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  const rateLimitResponse = await limitRequest(request);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(request);

  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Optional: total count for frontend to compute pages
    const total = await NFT.countDocuments();
    await User.find();
    await Bid.find();
    const nfts = await NFT.find()
      .populate([
        "creator",
        "owner",
        {
          path: "bids",
          populate: {
            path: "bidder",
          },
          options: { limit: 5 },
        },
      ])
      .skip(skip)
      .limit(limit)
      .lean<NftPayload[]>();

    if (!decoded || decoded instanceof NextResponse) {
      const enriched = nfts.map((nft) => ({
        ...nft,
        isLiked: false,
      }));

      return NextResponse.json(
        {
          data: enriched,
          pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
          },
          error: null,
          message: "NFTs retrieved successfully",
        },
        { status: 200 }
      );
    }

    const nftIds = nfts.map((n) => n._id);

    const userLikes = await Like.find({
      user: decoded._id,
      itemId: { $in: nftIds },
      itemType: "NFT",
    }).lean();

    const likedMap = new Set(userLikes.map((like) => like.itemId.toString()));

    const enriched = nfts.map((nft) => ({
      ...nft,
      isLiked: likedMap.has(nft._id.toString()),
    }));

    return NextResponse.json(
      {
        data: enriched,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        error: null,
        message: "NFTs retrieved successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    const errMessage =
      error instanceof Error ? error.message : "Failed to fetch NFTs";

    return NextResponse.json(
      {
        data: null,
        error: errMessage,
        message: "Failed to retrieve data",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const rateLimitResponse = await limitRequest(request);
  if (rateLimitResponse) return rateLimitResponse;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await dbConnect();
    const body = await request.json();
    const result = await buynftSchema.safeParseAsync(body);

    if (!result.success) {
      await session.abortTransaction();
      session.endSession();
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

    const user = await User.findById(result.data.user_id)
      .select("walletBalance")
      .session(session)
      .exec();
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          data: null,
          error: "User not found",
          message: "The specified user does not exist",
        },
        { status: 404 }
      );
    }

    const nft = await NFT.findById(result.data.nft_id)
      .select("price owner title type auctionEndTime")
      .session(session)
      .exec();
    if (!nft) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          data: null,
          error: "NFT not found",
          message: "The specified NFT does not exist",
        },
        { status: 404 }
      );
    }

    if (user._id.toString() === nft.owner._id.toString()) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          data: null,
          error: "Invalid Purchase",
          message: "You cannot purchase your own NFT",
        },
        { status: 400 }
      );
    }

    const userUpdate = await User.findOneAndUpdate(
      { _id: result.data.user_id, walletBalance: { $gte: nft.price } },
      { $inc: { walletBalance: -nft.price } },
      { session, new: true }
    );
    if (!userUpdate) {
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json(
        {
          data: null,
          error: "Insufficient Balance",
          message: "Your balance is not sufficient for this purchase",
        },
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(
      nft.owner._id,
      { $inc: { walletBalance: nft.price } },
      { session }
    );

    const purchasednft = await NFT.findByIdAndUpdate(
      result.data.nft_id,
      {
        owner: user._id,
        owning_collection: result.data.owning_collection,
        auctionEndTime: "2025-12-06", // Clear auctionEndTime
        bids: [],
      },
      { session, new: true }
    )
      .populate("owner", "name email")
      .populate("owning_collection", "name")
      .exec();

    await Collection.findByIdAndUpdate(
      result.data.former_collectionID,
      {
        $pull: { nfts: result.data.nft_id },
        $set: {
          floor_price: await NFT.find({
            _id: {
              $in: (
                (
                  await Collection.findById(result.data.former_collectionID)
                    .select("nfts")
                    .lean<{ nfts: string[] }>()
                )?.nfts || []
              ).filter(
                (id: string) => id.toString() !== result.data.nft_id.toString()
              ),
            },
          })
            .sort({ price: 1 })
            .limit(1)
            .then((nfts) => (nfts.length > 0 ? nfts[0].price : 0)),
        },
      },
      { session }
    );

    const notification = {
      type: "success",
      action: "bid",
      title: "NFT Purchased Successfully",
      message: `Successfully Purchased ${purchasednft.title}.`,
      recipient: user._id,
      data: { refType: "Nft", refId: nft._id },
    };

    const ownerNotification = {
      type: "success",
      action: "bid",
      title: "NFT Sold Successfully",
      message: `Your Art ${purchasednft.title}, has been Bought and the accepted Bid amount credited to your wallet`,
      recipient: nft.owner._id,
      data: { refType: "Nft", refId: nft._id },
    };

    await Notification.create([notification, ownerNotification], {
      session,
      ordered: true,
    });
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      data: purchasednft,
      error: null,
      message: "NFT purchase successful",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    let errMessage = "Failed to purchase NFT";
    let status = 500;
    if (error instanceof mongoose.Error.ValidationError) {
      errMessage = "Database validation error";
      status = 400;
    } else if (error instanceof mongoose.Error) {
      errMessage = "Database error";
    }
    console.log(error);
    return NextResponse.json(
      { data: null, error: errMessage, message: "Failed to retrieve data" },
      { status }
    );
  }
}

export async function POST(request: NextRequest) {
  const rateLimitResponse = await limitRequest(request);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(request);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  const body = await request.json();

  try {
    const result = nftInputSchema.safeParse(body);
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
    await dbConnect();
    const user = await User.findById(result.data.creator).exec();

    if (user.walletBalance < 0.15) {
      return NextResponse.json(
        {
          data: null,
          error: "Insufficient Balance",
          message: "Your Balance is not sufficient for this Mint",
        },
        { status: 400 }
      );
    }

    const formerNfts = await NFT.find({ creator: result.data.creator });

    const newnft = await NFT.insertOne(result.data);

    const collection = await Collection.findById(result.data.owning_collection);

    if (!collection) {
      throw new Error("Collection not found");
    }
    const isFirstNFT = !collection.floor_price || collection.floor_price === 0;

    await Collection.findByIdAndUpdate(
      result.data.owning_collection,
      {
        $push: { nfts: newnft._id },
        $inc: { total_volume: newnft.price },
        ...(isFirstNFT
          ? { $set: { floor_price: newnft.price } }
          : { $min: { floor_price: newnft.price } }),
      },
      { new: true }
    );

    if (!newnft)
      return NextResponse.json({
        data: null,
        error: "something went wrong while uploading nft",
        message: "nft upload failed",
      });

    if (!formerNfts) {
      await emailService.sendFirstNFTCreatedEmail({
        email: "roselucinda157@gmail.com",
        firstName: user.name,
        nftName: newnft.title,
        collectionName: collection.name,
        nftId: newnft._id,
      });
    }

    return NextResponse.json({
      data: newnft,
      error: null,
      message: "collection successfully placed",
    });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to upload nft";

    return NextResponse.json({
      data: null,
      error: errMessage,
      message: errMessage,
    });
  }
}
