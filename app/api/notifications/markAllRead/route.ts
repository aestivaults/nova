import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Notification } from "@/app/backend/models/notifications";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Rate limiting
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  // Auth check
  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) return decoded;

  try {
    await dbConnect();

    // Bulk update: set all notifications for the user as read
    const result = await Notification.updateMany(
      { recipient: decoded._id, isRead: false },
      { $set: { isRead: true } }
    );

    return NextResponse.json(
      {
        data: result,
        error: null,
        message: "All notifications marked as read",
      },
      { status: 200 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "Failed to update notifications";

    console.error("Mark all as read failed:", error);

    return NextResponse.json(
      {
        data: null,
        error: errMessage,
        message: "Error marking notifications as read",
      },
      { status: 500 }
    );
  }
}
