import { NextRequest, NextResponse } from "next/server";

const requestCache: Record<string, { count: number; timestamp: number }> = {};

const RATE_LIMIT = 70;
const TIME_WINDOW = 60 * 1000;

export async function limitRequest(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

    const currentTime = Date.now();
    const userRequest = requestCache[ip] || {
      count: 0,
      timestamp: currentTime,
    };

    if (currentTime - userRequest.timestamp < TIME_WINDOW) {
      if (userRequest.count >= RATE_LIMIT) {
        const timeLeft = TIME_WINDOW - (currentTime - userRequest.timestamp);
        return NextResponse.json(
          {
            data: null,
            error: "Too many requests. Please try again later.",
            message: "Too many requests. Please try again later.",
          },
          {
            status: 429,
            headers: { "Retry-After": Math.ceil(timeLeft / 1000).toString() },
          }
        );
      }
      userRequest.count += 1;
    } else {
      userRequest.count = 1;
      userRequest.timestamp = currentTime;
    }

    requestCache[ip] = userRequest;
    return null;
  } catch (err) {
    return NextResponse.json(
      { error: "Rate limiter failed", details: String(err) },
      { status: 500 }
    );
  }
}
