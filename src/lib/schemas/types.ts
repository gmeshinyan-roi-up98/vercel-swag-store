import { z } from "zod";

import { cartItemSchema, cartSchema } from "./cart";
import { categorySchema } from "./category";
import {
  addToCartInputSchema,
  removeCartItemInputSchema,
  updateCartItemInputSchema,
} from "./inputs";
import { paginationSchema } from "./pagination";
import { productCategorySchema, productSchema } from "./product";
import { promotionSchema } from "./promotion";
import { searchParamsSchema } from "./search";
import { storeConfigDataSchema, storeConfigResponseSchema } from "./store-config";
import { stockSchema } from "./stock";

export type TProductCategorySchema = z.infer<typeof productCategorySchema>;

export type TProductSchema = z.infer<typeof productSchema>;

export type TStockSchema = z.infer<typeof stockSchema>;

export type TCategorySchema = z.infer<typeof categorySchema>;

export type TPromotionSchema = z.infer<typeof promotionSchema>;

export type TCartItemSchema = z.infer<typeof cartItemSchema>;

export type TCartSchema = z.infer<typeof cartSchema>;

export type TPaginationSchema = z.infer<typeof paginationSchema>;

export type TStoreConfigData = z.infer<typeof storeConfigDataSchema>;

export type TStoreConfigResponse = z.infer<typeof storeConfigResponseSchema>;

export type TAddToCartInputSchema = z.infer<typeof addToCartInputSchema>;

export type TUpdateCartItemInputSchema = z.infer<typeof updateCartItemInputSchema>;

export type TRemoveCartItemInputSchema = z.infer<typeof removeCartItemInputSchema>;

export type TSearchParamsSchema = z.infer<typeof searchParamsSchema>;
