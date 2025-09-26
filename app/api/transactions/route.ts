import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Transaction } from "@/app/backend/models/transactions";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { transactionInputSchema } from "@/app/backend/zodschemas/transactions";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  const body = await req.json();
  await dbConnect();

  try {
    const result = transactionInputSchema.safeParse(body);
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

    const transaction = await Transaction.create({
      ...result.data,
      user: decoded._id,
    });

    return NextResponse.json({
      data: transaction,
      error: null,
      message: "transaction created successfully",
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      message: "something went wrong",
      error:
        error instanceof Error ? error.message : "failed to create transaction",
    });
  }
}
