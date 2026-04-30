import "server-only";

import { cache } from "react";

import { stockResponseSchema, type TStockSchema } from "@/lib/schemas";

import { apiRequest } from "./client";

export const getProductStock = cache(
  async (idOrSlug: string): Promise<TStockSchema | null> => {
    try {
      const { data } = await apiRequest({
        path: `/products/${encodeURIComponent(idOrSlug)}/stock`,
        schema: stockResponseSchema,
        init: { cache: "no-store" },
      });

      return data;
    } catch {
      return null;
    }
  }
);
