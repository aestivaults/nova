import { z } from "zod";

export const userProfileSchema = z
  .object({
    username: z.string().max(30).trim().optional(),
    name: z.string().max(50).trim().optional(),
    email: z.string().email().optional(),
    avatar: z.string().url().optional(),

    location: z.string().max(100).optional(),
    userType: z.string().max(50).optional(),

    badges: z.array(z.string().max(100)).optional(), // now array
    experienceLevel: z.string().max(50).optional(),
    availability: z.string().max(50).optional(),

    tags: z.array(z.string().max(100)).optional(), // now array
    tradingStyle: z.string().max(100).optional(),
    preferredBlockchain: z.string().max(100).optional(),

    nftsOwned: z.number().nonnegative().optional(),
    nftsSold: z.number().nonnegative().optional(),
    followers: z.number().nonnegative().optional(),
    totalVolume: z.number().nonnegative().optional(),

    favoriteCategories: z.array(z.string().max(100)).optional(), // now array

    socialMedia: z
      .object({
        twitter: z.string().optional(),
        discord: z.string().optional(),
        instagram: z.string().optional(),
      })
      .optional(),
  })
  .partial();

export const passwordUpdateSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
});
