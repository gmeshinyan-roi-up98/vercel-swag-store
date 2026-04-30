import { USD_FALLBACK_CURRENCY } from "@/constants";
import { z } from "zod";

export const productCategorySchema = z.enum([
  "bottles",
  "cups",
  "mugs",
  "desk",
  "stationery",
  "accessories",
  "bags",
  "hats",
  "t-shirts",
  "hoodies",
  "socks",
  "tech",
  "books",
]);

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  category: z.string(),
  createdAt: z.string(),
  description: z.string(),
  price: z.number().int(),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  images: z.array(z.string().url()).default([]),
  currency: z.string().default(USD_FALLBACK_CURRENCY),
});
