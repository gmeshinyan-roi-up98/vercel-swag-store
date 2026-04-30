import { z } from "zod";

export const searchParamsSchema = z.object({
  query: z.string().trim().optional().default(""),
  category: z.string().trim().optional().default(""),
  page: z.coerce.number().int().min(1).catch(1),
});
