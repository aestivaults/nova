import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { Notification } from "@/app/backend/models/notifications";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import {
  NotificationSchema,
  NotificationUpdateSchema,
} from "@/app/backend/zodschemas/notification";
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
  const result = NotificationSchema.safeParse(body);

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
    const notice = await Notification.insertOne(result.data);

    return NextResponse.json(
      {
        data: notice,
        error: null,
        message: "notice added",
      },
      { status: 200 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to upload notice";

    return NextResponse.json({
      data: null,
      error: errMessage,
      message: "failure while uploading notice",
    });
  }
}

export async function GET(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = parseInt(searchParams.get("skip") || "0", 10);

  await dbConnect();

  try {
    const notifications = await Notification.find({ recipient: decoded._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Optional: total count for pagination
    const total = await Notification.countDocuments({ recipient: decoded._id });

    return NextResponse.json(
      {
        data: notifications,
        pagination: {
          total,
          skip,
          limit,
        },
        error: null,
        message: notifications.length
          ? "Notifications fetched successfully"
          : "No notifications found",
      },
      { status: 200 }
    );
  } catch (err) {
    const error =
      err instanceof Error ? err.message : "Failed to fetch notifications";
    return NextResponse.json(
      {
        data: null,
        error,
        message: "Database query failed",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  const body = await req.json();
  const result = NotificationUpdateSchema.safeParse(body);

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
    const notice = await Notification.findByIdAndUpdate(result.data._id, {
      isRead: result.data.isRead,
    });

    return NextResponse.json(
      {
        data: notice,
        error: null,
        message: "notice updated",
      },
      { status: 200 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to update notice";

    return NextResponse.json({
      data: null,
      error: errMessage,
      message: "failure while update notice",
    });
  }
}

export async function DELETE(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const decoded = await requireAuth(req);
  if (decoded instanceof NextResponse) {
    return decoded;
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("_id");

  if (!id) {
    return NextResponse.json(
      {
        data: null,
        error: "Missing notification ID",
        message: "Invalid request",
      },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const notice = await Notification.findByIdAndDelete(id);

    return NextResponse.json(
      {
        data: notice,
        error: null,
        message: "notice updated",
      },
      { status: 200 }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to update notice";

    return NextResponse.json({
      data: null,
      error: errMessage,
      message: "failure while update notice",
    });
  }
}
