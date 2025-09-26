import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      cookieStore.delete("token");
      return NextResponse.json(
        {
          data: null,
          error: null,
          message: "No active session or user already logged out",
        },
        { status: 401 }
      );
    }

    await dbConnect();
    const foundUser = await User.findOne({
      refresh_token: refreshToken,
    }).exec();

    if (!foundUser) {
      // User not found with that refreshToken, logout on both ends
      cookieStore.delete("refreshToken");
      cookieStore.delete("token");
      cookieStore.delete("user");
      return NextResponse.json(
        {
          data: null,
          error: "authorization error",
          message: "Unauthorized access, user not found",
        },
        { status: 401 }
      );
    }

    foundUser.refresh_token = "";
    await foundUser.save();

    // Clear cookies
    cookieStore.delete("refreshToken");
    cookieStore.delete("user");

    return NextResponse.json(
      {
        data: null,
        message: "Logged out successfully",
        error: null,
      },
      { status: 200 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Failed to logout user";
    return NextResponse.json(
      { data: null, error: errMessage, message: "Failed to logout user" },
      { status: 500 }
    );
  }
}
