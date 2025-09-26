import { AuthUserPayload } from "@/app/types/jwt";
import jwt from "jsonwebtoken";
const accessTokenSecret = process.env.JWT_SECRET as string;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;

export function signJwt(payload: object) {
  const accessToken = jwt.sign(payload, accessTokenSecret, {
    expiresIn: "1d",
  });

  const refreshToken = jwt.sign(payload, refreshTokenSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, accessTokenSecret) as AuthUserPayload | null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export function verifyRefreshJwt(token: string) {
  try {
    return jwt.verify(token, refreshTokenSecret) as AuthUserPayload | null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
