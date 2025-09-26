import { JwtPayload } from "jsonwebtoken";

export interface AuthUserPayload extends JwtPayload {
  _id: string;
  role: "user" | "admin";
  name: string;
}
