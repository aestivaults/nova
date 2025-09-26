import { requireAuth } from "@/app/backend/jwt/authMiddleware";
import { generate6DigitOTP } from "@/app/backend/jwt/create_ids";
import { signJwt } from "@/app/backend/jwt/verifyjwt";
import { User } from "@/app/backend/models/user";
import { VerificationCode } from "@/app/backend/models/VerificationCode";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { emailService } from "../mail";
import { User as Iuser } from "@/app/types/user";

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const decoded = await requireAuth(req);
    if (decoded instanceof NextResponse) {
      return decoded;
    }

    await dbConnect();

    // Get user data
    const user = await User.findById(decoded._id).select(
      "name email email_verified"
    );
    if (!user) {
      return NextResponse.json(
        { data: null, message: "User not found", error: "User not found" },
        { status: 404 }
      );
    }

    if (user.email_verified) {
      return NextResponse.json(
        {
          data: null,
          message: "Email already verified",
          error: "Email already verified",
        },
        { status: 400 }
      );
    }

    const otp = generate6DigitOTP();

    const verification = await VerificationCode.create({
      user: user._id,
      code: otp,
      type: "email-verification",
    });

    const magiclink = `${process.env.NEXT_PUBLIC_API_URL}/mail/verifyMail?token=${verification._id.toString()}`;

    await emailService.sendOTPVerification({
      email: "roselucinda157@gmail.com",
      firstName: user.name,
      otpCode: otp,
      magicLink: magiclink,
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

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const token = searchParams.get("token");

  let code_id = token;

  try {
    await dbConnect();

    let otpUser: Iuser;

    if (token) {
      const codeDoc = await fetchCodeDoc({ token });
      if (codeDoc instanceof NextResponse) return codeDoc;

      const isExpired = await checkTime(codeDoc);
      if (isExpired instanceof NextResponse) {
        const message = encodeURIComponent(
          "Token has expired please request new one"
        );
        return NextResponse.redirect(
          `${process.env.BASE_URL}/error?message=${message}`
        );
      }

      otpUser = codeDoc.user;
    } else if (code) {
      const codeDoc = await fetchCodeDoc({ code });
      if (codeDoc instanceof NextResponse) return codeDoc;

      const isExpired = await checkTime(codeDoc);
      if (isExpired instanceof NextResponse) return isExpired;

      otpUser = codeDoc.user;
      code_id = codeDoc._id;
    } else {
      return NextResponse.json(
        {
          data: null,
          message: "Invalid request",
          error: "Missing required parameters",
        },
        { status: 400 }
      );
    }

    const { refreshToken, accessToken } = signJwt({
      _id: otpUser._id,
      role: otpUser.role,
      name: otpUser.name,
    });

    await User.findByIdAndUpdate(otpUser._id, {
      email_verified: true,
      refresh_token: refreshToken,
    });

    const cookieStore = await cookies();
    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    cookieStore.set({
      name: "token",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    await VerificationCode.findByIdAndDelete(code_id);
    if (token)
      return NextResponse.redirect(`${process.env.BASE_URL}/dashboard`);

    return NextResponse.json({
      data: { _id: otpUser._id, role: otpUser.role, name: otpUser.name },
      error: null,
      message: "Email verified successfully",
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

    if (token) {
      const message = encodeURIComponent(
        "Something went wrong please contact support"
      );
      return NextResponse.redirect(
        `${process.env.BASE_URL}/error?message=${message}`
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
}

async function fetchCodeDoc({
  token,
  code,
}: {
  token?: string;
  code?: string;
}) {
  if (token) {
    const codeDoc = await VerificationCode.findOne({
      _id: token,
      type: "email-verification",
    }).populate("user");

    if (!codeDoc) {
      const message = encodeURIComponent("Token is Invalid or Expired");
      return NextResponse.redirect(
        `${process.env.BASE_URL}/error?message=${message}`
      );
    }

    return codeDoc;
  }

  const codeDoc = await VerificationCode.findOne({
    code,
    type: "email-verification",
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
