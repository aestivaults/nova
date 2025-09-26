import { limitRequest } from "@/app/backend/rateLimiter/limiter";
import { NextRequest, NextResponse } from "next/server";
import { clientRefresh } from "./clientRefresh";
import { SeverRefresh } from "./serverRefresh";

export async function POST(req: NextRequest) {
  const rateLimitResponse = await limitRequest(req);
  if (rateLimitResponse) return rateLimitResponse;

  const { refreshToken } = await req.json();

  const serverResponse = await SeverRefresh(refreshToken);
  if (serverResponse instanceof NextResponse) return serverResponse;
  const clientResponse = await clientRefresh();
  if (clientResponse instanceof NextResponse) return clientResponse;

  return NextResponse.json(
    {
      data: null,
      error: "Unknown error",
      message: "Token refresh failed",
    },
    { status: 500 }
  );
}
