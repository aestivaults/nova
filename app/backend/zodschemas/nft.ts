import { z } from "zod";

export const buynftSchema = z.object({
  user_id: z.string(),
  nft_id: z.string(),
});

export const nftInputSchema = z.object({
  title: z.string(),
  description: z.string(),
  owning_collection: z.string(),
  creator: z.string(),
  owner: z.string(),
  token_id: z.string(),
  type: z.enum(["auction", "sale"]),
  price: z.number(),
  likes_count: z.number().int().nonnegative(),
  media_type: z.literal("image"), // If it’s always "image"
  media_url: z.string().url(), // Assumes it's a URL
  current_bid: z.number(),
  metadata: z.object({
    contract: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid contract address"),
    blockchain: z.string(), // Could restrict to a union of known chains
    tokenStandard: z.enum(["ERC-721", "ERC-1155", "SPL"]),
  }),
  auctionEndTime: z.string().optional(), // Conditionally added
});
