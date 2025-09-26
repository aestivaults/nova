import { AuthUserPayload } from "@/app/types/jwt";
import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "./verifyjwt";

export async function requireAuth(
  req: NextRequest
): Promise<AuthUserPayload | NextResponse> {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Missing or invalid Authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyJwt(token) as AuthUserPayload | null;

  if (!decoded) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  return decoded;
}
