import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { generate6DigitOTP } from "@/app/backend/jwt/create_ids";
import { User } from "@/app/backend/models/user";
import { VerificationCode } from "@/app/backend/models/VerificationCode";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NextRequest, NextResponse } from "next/server";
import { emailService } from "../mail";

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const decoded = await requireAuth(req);
    if (decoded instanceof NextResponse) {
      return decoded;
    }

    await dbConnect();

    const user = await User.findById(decoded._id).select("name ");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          data: null,
          error: "email is required in query",
          message: "Invalid request",
        },
        { status: 400 }
      );
    }

    const otp = generate6DigitOTP();

    await VerificationCode.create({
      user: decoded._id,
      code: otp,
      type: "email-reset",
    });

    await emailService.sendEmailChangeConfirmationEmail({
      email: "roselucinda157@gmail.com",
      newEmail: email,
      firstName: user.name,
      confirmationToken: otp,
      expiresIn: 5,
    });

    return NextResponse.json({
      data: [],
      error: null,
      message: "OTP sent successfully",
    });
  } catch (err) {
    return NextResponse.json(
      {
        data: null,
        message: "Failed to send OTP",
        error: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 }
    );
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
  const code = searchParams.get("code");
  const newEmail = searchParams.get("newEmail");

  try {
    await dbConnect();

    if (!code || !newEmail)
      return NextResponse.json({
        data: null,
        error: "code and New Email is required in query",
        message: "Invalid Request, code or new Email missing in query",
      });

    const codeDoc = await fetchCodeDoc({ code });
    if (codeDoc instanceof NextResponse) return codeDoc;

    const isExpired = await checkTime(codeDoc);
    if (isExpired instanceof NextResponse) return isExpired;

    await User.findByIdAndUpdate(decoded._id, {
      email: newEmail,
    });

    await VerificationCode.findOneAndDelete({ code });

    return NextResponse.json({
      data: [],
      error: null,
      message: "Email successfully updated",
    });
  } catch (error) {
    console.error("Email verification error:", error);

    if (error instanceof Error && error.message.includes("expired")) {
      return NextResponse.json(
        {
          data: null,
          message: "Verification expired",
          error: "Please request a new verification",
        },
        { status: 410 }
      );
    }

    return NextResponse.json(
      {
        data: null,
        message: "Verification failed",
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}

async function checkTime(codeDoc: { _id: string; createdAt: Date }) {
  const now = new Date();
  const expiresInMs = 5 * 60 * 1000;

  if (now.getTime() - codeDoc.createdAt.getTime() > expiresInMs) {
    await VerificationCode.findByIdAndDelete(codeDoc._id);

    return NextResponse.json(
      {
        data: null,
        message: "Expired code",
        error: "code found but has expired",
      },
      { status: 400 }
    );
  }

  return null;
}

async function fetchCodeDoc({ code }: { code?: string }) {
  const codeDoc = await VerificationCode.findOne({
    code,
    type: "email-reset",
  }).populate("user");

  if (!codeDoc) {
    return NextResponse.json(
      {
        data: null,
        message: "invalid code",
        error: "code not found",
      },
      { status: 400 }
    );
  }
  return codeDoc;
}
