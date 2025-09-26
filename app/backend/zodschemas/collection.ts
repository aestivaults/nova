import { z } from "zod";

export const CollectionSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  royalties: z.number(),
  logo_image: z.string(),
  banner_image: z.string(),
  featured: z.boolean(),
  floor_price: z.number(),
  owner: z.string(),
  creator: z.string(),
  total_volume: z.number(),
  owners: z.array(z.string()),
});
