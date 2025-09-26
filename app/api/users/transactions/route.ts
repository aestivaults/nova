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
    const Transactions = await Transaction.find({ user: decoded._id }).lean<
      TransactionProps[]
    >();

    return NextResponse.json({
      data: Transactions,
      error: null,
      message: "transactions fetched successfully",
    });
  } catch (error) {
    const errMessage =
      error instanceof Error
        ? error.message
        : "failed to fetch user transactions";
    return NextResponse.json({
      data: null,
      error: errMessage,
      message: "something went wrong",
    });
  }
}
