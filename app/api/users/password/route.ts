import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { passwordUpdateSchema } from "@/app/backend/zodschemas/userSchema";
import { NextRequest, NextResponse } from "next/server";
import { treeifyError } from "zod";
import bcrypt from "bcrypt";
import { User } from "@/app/backend/models/user";

export async function PATCH(request: NextRequest) {
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

  const result = passwordUpdateSchema.safeParse(body);

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

  const { currentPassword, newPassword } = result.data;

  try {
    const user = await User.findById(decoded._id).exec();

    const verifyPassword = await bcrypt.compare(currentPassword, user.password);

    if (!verifyPassword)
      return NextResponse.json(
        {
          data: null,
          error: "invalid password",
          message: "Invalid password",
        },
        { status: 401 }
      );

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      data: [],
      error: null,
      message: "Password updated successfully",
    });
  } catch (error) {
    return NextResponse.json({
      data: null,
      error: error instanceof Error ? error.message : "failed to update ",
    });
  }
}
