import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Bid } from "@/app/backend/models/bids";
import { Collection } from "@/app/backend/models/collection";
import { NFT } from "@/app/backend/models/nft";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { CollectionSchema } from "@/app/backend/zodschemas/collection";
import { CollectionPayload } from "@/app/types/collection";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";
import { emailService } from "../mail/mail";
import { User } from "@/app/backend/models/user";

export async function GET(request: NextRequest) {
  const rateLimitResponse = await limitRequest(request);
  if (rateLimitResponse) return rateLimitResponse;

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = (page - 1) * limit;

  try {
    await dbConnect();

    const total = await NFT.countDocuments();

    await NFT.find();
    await Bid.find();
    const collections = await Collection.find()
      .populate("creator", "username avatar email name") // populate with specific user fields
      .populate("owner", "username avatar email name") // optional field
      .populate("owners", "username avatar email name") // array of user references
      .populate({
        path: "nfts",
        populate: [
          { path: "creator", select: "username avatar email name" },
          { path: "owner", select: "username avatar email name" },
          {
            path: "bids",
            populate: {
              path: "bidder",
              select: "username avatar emailname",
            },
            options: { limit: 5 },
          },
        ],
      })
      .skip(skip)
      .limit(limit)
      .lean<CollectionPayload[]>(); // populate full NFT documents

    // Return the populated collections
    return NextResponse.json({
      data: collections,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      message: "collections fetched successfully",
      error: null,
    });
  } catch (error) {
    console.error("Error fetching collections:", error);
    return NextResponse.json(
      {
        data: null,
        message: "failed to fetch collections",
        error: "Failed to fetch collections",
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
    const result = CollectionSchema.safeParse(body);
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
    const formerCollections = await Collection.find({
      creator: result.data.owner,
    });
    const collection = await Collection.insertOne(result.data);

    if (!collection)
      return NextResponse.json({
        data: null,
        error: "something went wrong while uploading collection",
        message: "collection upload failed",
      });

    if (!formerCollections) {
      const user = await User.findById(result.data.owner);
      await emailService.sendFirstCollectionCreatedEmail({
        email: "roselucinda157@gmail.com",
        firstName: user.name,
        collectionName: collection.name,
        collectionId: collection._id,
      });
    }

    return NextResponse.json({
      data: collection,
      error: null,
      message: "collection successfully placed",
    });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to upload collection";

    return NextResponse.json({
      data: null,
      error: errMessage,
      message: errMessage,
    });
  }
}
