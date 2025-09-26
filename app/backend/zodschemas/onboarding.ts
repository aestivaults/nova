import { z } from "zod";

export const OnBoardingSchema = z.object({
  userType: z.string(),
  tradingStyle: z.string(),
  preferredBlockchain: z.string(),
  experienceLevel: z.string(),
  availability: z.string(),
});
