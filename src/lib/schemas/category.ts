import { z } from "zod";

export const categorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  productCount: z.number().int().nonnegative(),
});
