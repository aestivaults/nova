import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { OnBoardingSchema } from "@/app/backend/zodschemas/onboarding";
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

  try {
    const result = OnBoardingSchema.safeParse(body);
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
    const updatedUser = await User.findByIdAndUpdate(decoded._id, {
      ...result.data,
    });

    if (!updatedUser)
      return NextResponse.json({
        data: null,
        error: "something went wrong while uploading user",
        message: "user updated failed",
      });

    return NextResponse.json({
      data: updatedUser,
      error: null,
      message: "user successfully updated",
    });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to update user";

    return NextResponse.json({
      data: null,
      error: errMessage,
      message: errMessage,
    });
  }
}
