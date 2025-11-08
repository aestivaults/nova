import { z } from "zod";

export const BidSchema = z.object({
  nft: z.string(),
  bidder: z.string(),
  amount: z.number(),
  time: z.string(),
});

export const updateBidSchema = z.object({
  _id: z.string(),
  nft: z.string(),
  bidder: z.string(),
  status: z.string(),
});
