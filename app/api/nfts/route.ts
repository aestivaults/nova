// app/api/nfts/route.ts
import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import { Collection } from "@/app/backend/models/collection";
import { Like } from "@/app/backend/models/likes";
import { NFT } from "@/app/backend/models/nft";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { buynftSchema, nftInputSchema } from "@/app/backend/zodschemas/nft";
import { NftPayload } from "@/app/types/nftTypes";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";

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

  try {
    await dbConnect();
    const body = await request.json();
    const result = buynftSchema.safeParse(body);

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

    const user = await User.findById(result.data.user_id).exec();
    const nft = await NFT.findById(result.data.nft_id).exec();

    if (user.walletBalance < nft.price) {
      return NextResponse.json(
        {
          data: null,
          error: "Insufficient Balance",
          message: "Your Balance is not sufficient for this purchase",
        },
        { status: 400 }
      );
    }

    await User.findByIdAndUpdate(result.data.user_id, {
      walletBalance: user.walletBalance - nft.price,
    });

    const purchasednft = await NFT.findByIdAndUpdate(result.data.nft_id, {
      owner: user._id,
    });

    return NextResponse.json({
      data: purchasednft,
      error: null,
      message: "nft purchase successful",
    });
  } catch (error) {
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
