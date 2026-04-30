import "server-only";

import { promotionResponseSchema, type TPromotionSchema } from "@/lib/schemas";

import { apiRequest } from "./client";

export const getActivePromotion =
  async (): Promise<TPromotionSchema | null> => {
    try {
      const { data } = await apiRequest({
        path: "/promotions",
        schema: promotionResponseSchema,
      });

      return data;
    } catch {
      return null;
    }
  };
