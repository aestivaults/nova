import { signJwt, verifyRefreshJwt } from "@/app/backend/jwt/verifyjwt";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function clientRefresh() {
  const cookieStore = await cookies();
  try {
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          data: null,
          error: "authorization error",
          message: "unauthorized access",
        },
        { status: 401 }
      );
    }

    const decoded = verifyRefreshJwt(refreshToken);
    if (!decoded) {
      return NextResponse.json(
        { data: null, error: "authorization error", message: "invalid token" },
        { status: 403 }
      );
    }

    await dbConnect();

    const foundUser = await User.findOne({
      _id: decoded._id,
      // refresh_token: refreshToken,
    });
    if (!foundUser) {
      return NextResponse.json(
        { data: null, error: "authorization error", message: "user not found" },
        { status: 401 }
      );
    }

    const { refreshToken: newRefreshToken, accessToken } = signJwt({
      _id: foundUser._id,
      role: foundUser.role,
      name: foundUser.name,
      email: foundUser.email,
      username: foundUser.username,
      walletBalance: foundUser.walletBalance,
      owner_id: foundUser.owner_id,
      avatar: foundUser.avatar,
    });

    foundUser.refresh_token = newRefreshToken;
    await foundUser.save();

    cookieStore.set({
      name: "refreshToken",
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
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
        data: null,
        token: accessToken,
        error: null,
        message: "token refreshed",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { data: null, error: "server error", message: "something went wrong" },
      { status: 500 }
    );
  }
}
