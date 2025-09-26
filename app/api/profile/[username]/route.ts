import { Collection } from "@/app/backend/models/collection";
import { Notification } from "@/app/backend/models/notifications";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { CollectionPayload } from "@/app/types/collection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const params = await context.params;

  const { username } = params;

  if (!username) {
    return NextResponse.json({
      data: null,
      collections: null,
      error: "Username is missing",
      message: "no username specified in params",
    });
  }

  await dbConnect();
  try {
    const profile = await User.findOne({ username }).lean<{
      refresh_token: string;
      password: string;
      login_type: string;
      _id: string;
      google_id: string;
      email: string;
      role: string;
      email_verified: string;
      dallas: string;
    }>();

    if (!profile)
      return NextResponse.json(
        {
          data: null,
          errror: "failed to fetch user",
          message: "User not found",
        },
        { status: 404 }
      );
    /* eslint-disable @typescript-eslint/no-unused-vars */
    const {
      refresh_token,
      password,
      login_type,
      google_id,
      email,
      role,
      email_verified,
      ...safeuser
    } = profile;
    /* eslint-disable @typescript-eslint/no-unused-vars */

    const profileCollections = await Collection.find({
      owner: safeuser._id,
    }).lean<CollectionPayload[]>();

    const notifications = await Notification.find({ recipient: safeuser._id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      data: {
        user: { ...safeuser, followers: 0, totalVolume: 0 },
        collections: profileCollections,
        notifications,
      },
      error: null,
      message: "user fetched successfully ",
    });
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to load profile data";
    return NextResponse.json({
      data: null,
      collections: null,
      error: errMessage,
    });
  }
}
