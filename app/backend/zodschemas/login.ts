import { z } from "zod";

export const userSchema = z.object({
  password: z.string(),
  email: z.email(),
});
