import { signJwt } from "@/app/backend/jwt/verifyjwt";
import { User } from "@/app/backend/models/user";
import dbConnect from "@/app/backend/mongoose/mongoose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const client_id = process.env.GOOGLE_CLIENT_ID as string;
const client_secret = process.env.GOOGLE_CLIENT_SECRET as string;
const PROJECT_URL = process.env.BASE_URL as string;
const redirect = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT as string;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(
        `${PROJECT_URL}/error?type=googe-code-error&error=${"missing code"}`
      );
    }

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id,
        client_secret,
        redirect_uri: redirect,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    // Fetch Google profile
    const profileRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const profile = await profileRes.json();

    await dbConnect();

    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.create({
        username: "",
        email: profile.email,
        name: profile.name,
        role: "user",
        owner_id: "",
        google_id: profile.id,
        loginType: "google",
        walletBalance: 0,
        isVerified: false,
        refreshToken: "",
        avatar: profile.picture,
      });
    }

    const { refreshToken, accessToken } = signJwt({
      _id: user._id,
      role: user.role,
      name: profile.name,
    });

    user.refreshToken = refreshToken;
    await user.save();

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

    return NextResponse.redirect(PROJECT_URL);
  } catch (error) {
    const errMessage =
      error instanceof Error ? error.message : "failed to login user";
    return NextResponse.redirect(
      `${PROJECT_URL}/error?type=googe-auth-error&error=${errMessage}`
    );
  }
}
