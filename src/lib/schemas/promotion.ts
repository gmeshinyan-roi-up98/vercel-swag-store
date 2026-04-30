import { z } from "zod";

export const promotionSchema = z.object({
  id: z.string(),
  title: z.string(),
  code: z.string(),
  active: z.boolean(),
  validFrom: z.string(),
  validUntil: z.string(),
  description: z.string(),
  discountPercent: z.number().int(),
});
