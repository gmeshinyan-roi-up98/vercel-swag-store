import { z } from "zod";

export const stockSchema = z.object({
  inStock: z.boolean(),
  lowStock: z.boolean(),
  productId: z.string(),
  stock: z.number().int().nonnegative(),
});
