import { z } from "zod";

export const transactionInputSchema = z.object({
  type: z.string(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
  note: z.string(),
  amount: z.number().positive(),

  fee: z.number().positive().optional(),
  network: z.string().optional(),
  txHash: z.string().optional(),

  toAddress: z.string().optional(),
});
