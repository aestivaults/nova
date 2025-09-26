import { z } from "zod";
const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;

export const registerSchema = z.object({
  password: z.string().min(6),
  name: z.string().min(4),
  email: z.email(),
  username: z
    .string()
    .regex(
      usernameRegex,
      "Username must be between 3-20 characters and can only include letters, numbers, underscores, and hyphens."
    ),
});
