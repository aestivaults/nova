import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username || typeof username !== "string") {
    return NextResponse.json(
      {
        data: null,
        error: "Username is required in query",
        message: "Invalid request",
      },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const serverUser = await User.findOne({ username }).lean();

    return NextResponse.json(
      {
        data: serverUser || null,
        error: null,
        message: serverUser ? "User found" : "User not found",
      },
      { status: 200 }
    );
  } catch (err) {
    const errMessage =
      err instanceof Error ? err.message : "Failed to fetch user";
    console.error("User fetch error:", errMessage);

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
