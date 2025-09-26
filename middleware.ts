import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET_KEY = new TextEncoder().encode(process.env.REFRESH_TOKEN_SECRET);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();

  if (pathname.startsWith("/admin") || pathname.startsWith("/dashboard")) {
    const token = cookieStore.get("refreshToken")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    // if (pathname.startsWith("/admin") && payload.role !== "admin") {
    //   return NextResponse.redirect(new URL("/dashboard", request.url));
    // }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
