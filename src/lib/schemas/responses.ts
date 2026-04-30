import { z } from "zod";

import { cartSchema } from "./cart";
import { categorySchema } from "./category";
import { paginationSchema } from "./pagination";
import { productSchema } from "./product";
import { promotionSchema } from "./promotion";
import { stockSchema } from "./stock";

const successResponse = <T extends z.ZodTypeAny>(data: T) =>
  z.object({
    success: z.literal(true),
    data,
    meta: z
      .object({
        pagination: paginationSchema.optional(),
      })
      .optional(),
  });

export const productListResponseSchema = successResponse(
  z.array(productSchema),
);

export const productResponseSchema = successResponse(productSchema);
export const stockResponseSchema = successResponse(stockSchema);
export const categoryListResponseSchema = successResponse(
  z.array(categorySchema),
);
export const promotionResponseSchema = successResponse(promotionSchema);
export const cartResponseSchema = successResponse(cartSchema);

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.unknown().optional(),
  }),
});
