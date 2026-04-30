import { z } from "zod";

export const addToCartInputSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(99),
});

export const updateCartItemInputSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(0).max(99),
});

export const removeCartItemInputSchema = z.object({
  productId: z.string().min(1),
});
