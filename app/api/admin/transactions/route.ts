import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Transaction } from "@/app/backend/models/transactions";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { transactionUpdateSchema } from "@/app/backend/zodschemas/transactions";
import { TransactionProps } from "@/app/types/transactions";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";

export async function GET(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Optional: total count for frontend to compute pages
    const total = await Transaction.countDocuments();

    const Transactions = await Transaction.find()
      .populate("user", "_id name email avatar walletBalance username")
      .skip(skip)
      .limit(limit)
      .lean<TransactionProps[]>();

    if (!Transactions)
      return NextResponse.json(
        {
          data: null,
          error: "failed to fetch Transactions",
          message: "Transactions not found",
        },
        { status: 404 }
      );

    return NextResponse.json(
      {
        data: [...Transactions].reverse(),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
        message: "Trasnsactions fetched successfully",
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to load Trasnsactions";

    return NextResponse.json(
      { data: null, error: errMessage, message: "something went wrong" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const body = await req.json();
  const result = transactionUpdateSchema.safeParse(body);

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

    const txData = result.data;

    // find transaction
    const tx = await Transaction.findById(txData.id);

    if (!tx) {
      return NextResponse.json(
        {
          data: null,
          error: "Transaction not found",
          message: "Cannot update a non-existent Transaction",
        },
        { status: 404 }
      );
    }

    // 2. Update NFT current bid
    await Transaction.updateOne(
      { _id: txData.id },
      {
        status: txData.status,
      }
    );

    if (txData.status === "approved") {
      await User.findByIdAndUpdate(txData.user._id, {
        $inc: { walletBalance: tx.amount },
      });
    }

    if (txData.status === "reversed") {
      await User.findByIdAndUpdate(txData.user._id, {
        $inc: { walletBalance: -tx.amount },
      });
    }

    return NextResponse.json(
      {
        data: tx,
        error: null,
        message: "Transaction updated successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Failed to update Transaction";
    return NextResponse.json(
      {
        data: null,
        error: errMessage,
        message: "Something went wrong while updating Transactions bid",
      },
      { status: 500 }
    );
  }
}
