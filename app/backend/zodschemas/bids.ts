import { z } from "zod";

export const BidSchema = z.object({
  nft: z.string(),
  bidder: z.string(),
  amount: z.number(),
  time: z.string(),
});
