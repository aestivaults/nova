import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { User } from "@/app/backend/models/user";
import { signJwt } from "@/app/backend/jwt/verifyjwt";
import { userSchema } from "@/app/backend/zodschemas/login";
import { treeifyError } from "zod";
import { limitRequest } from "@/app/backend/rateLimiter/limiter";

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const cookieStore = await cookies();

  const body = await req.json();
  const result = userSchema.safeParse(body);
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
  const { email, password } = result.data;
  try {
    const user = await User.findOne({ email: email.toLowerCase() }).exec();

    if (!user)
      return NextResponse.json(
        {
          data: null,
          error: "invalid credentials",
          message: "Invalid password or Email",
        },
        { status: 401 }
      );

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword)
      return NextResponse.json(
        {
          data: null,
          error: "invalid credentials",
          message: "Invalid password or Email",
        },
        { status: 401 }
      );
    const { password: _, ...safeUser } = user.toObject();

    const { refreshToken, accessToken } = signJwt({
      _id: safeUser._id,
      role: safeUser.role,
      name: safeUser.name,
    });

    user.refresh_token = refreshToken;
    await user.save();

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

    return NextResponse.json(
      {
        data: safeUser,
        token: accessToken,
        message: "user fetched successfully",
        error: null,
      },
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to login user";
    return NextResponse.json(
      {
        data: null,
        message: "Login Failed please try again",
        error: errMessage,
      },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
