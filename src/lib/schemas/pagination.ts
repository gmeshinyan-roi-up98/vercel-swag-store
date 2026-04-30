import { z } from "zod";

export const paginationSchema = z.object({
  page: z.number().int(),
  limit: z.number().int(),
  total: z.number().int(),
  hasNextPage: z.boolean(),
  totalPages: z.number().int(),
  hasPreviousPage: z.boolean(),
});
