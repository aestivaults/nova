import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Transaction } from "@/app/backend/models/transactions";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { TransactionProps } from "@/app/types/transactions";
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

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Optional: total count for frontend to compute pages
    const total = await Transaction.countDocuments();

    const Transactions = await Transaction.find()
      .populate("user")
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
