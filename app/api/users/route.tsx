import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { userProfileSchema } from "@/app/backend/zodschemas/userSchema";
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
    const serverUser = await User.findById(decoded._id)
      .select("-password -refresh_token -login_type")
      .lean();

    return NextResponse.json(
      {
        data: serverUser,
        error: null,
        message: "user retrieved successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Failed to Fetch user";
    console.log(err);
    return NextResponse.json(
      {
        data: null,
        error: errMessage,
        message: "Failed to fetch user",
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

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      {
        data: null,
        error: "Request body is missing or invalid",
        message: "Invalid request",
      },
      { status: 400 }
    );
  }

  try {
    const result = userProfileSchema.safeParse(body);
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
    const updatedUser = await User.findByIdAndUpdate(decoded._id, result.data);

    if (!updatedUser)
      return NextResponse.json({
        data: null,
        error: "something went wrong while updating user",
        message: "collection upload failed",
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
