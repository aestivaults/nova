import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { registerSchema } from "@/app/backend/zodschemas/register";
import { treeifyError } from "zod";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { User } from "@/app/backend/models/user";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { signJwt } from "@/app/backend/jwt/verifyjwt";

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const body = await req.json();
  const result = registerSchema.safeParse(body);

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

  const { email, password, username, name } = result.data;
  await dbConnect();

  try {
    const usernameExists = await User.findOne({ username });

    if (usernameExists)
      return NextResponse.json(
        {
          data: null,
          message: "username already exist's please try another",
          error: "username already exists",
        },
        { status: 422 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username: username.toLowerCase(),
      email,
      name,
      role: "user",
      login_type: "custom",
      walletBalance: 0,
      isVerified: false,
      refresh_token: "",
      password: hashedPassword, // hash this before saving in production
      avatar: "/pfp.png",
    });

    const { password: _, ...safeUser } = user.toObject();

    const { refreshToken, accessToken } = signJwt({
      _id: safeUser._id,
      role: safeUser.role,
      name: safeUser.name,
    });

    await User.findByIdAndUpdate(safeUser._id, { refresh_token: refreshToken });

    const cookieStore = await cookies();

    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    cookieStore.set({
      name: "token",
      value: accessToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mail/verifyMail`, {
      method: "POST",
      headers: { authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(
      {
        data: safeUser,
        message: "user fetched successfully",
        error: null,
        token: accessToken,
      },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to create user";
    return NextResponse.json(
      {
        data: null,
        message: "failed to create user",
        error: errMessage,
      },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
