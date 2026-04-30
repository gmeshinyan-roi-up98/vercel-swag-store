import { z } from "zod";

import { productSchema } from "./product";
import { USD_FALLBACK_CURRENCY } from "@/constants";

export const cartItemSchema = z.object({
  addedAt: z.string(),
  productId: z.string(),
  product: productSchema,
  quantity: z.number().int().positive(),
  lineTotal: z.number().int().nonnegative(),
});

export const cartSchema = z.object({
  token: z.string(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  items: z.array(cartItemSchema).default([]),
  currency: z.string().default(USD_FALLBACK_CURRENCY),
  subtotal: z.number().int().nonnegative().default(0),
  totalItems: z.number().int().nonnegative().default(0),
});
