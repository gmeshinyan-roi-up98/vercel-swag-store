import type { TCartSchema, TStockSchema } from "@/lib/schemas";

export type CartActionResult =
  | {
      ok: true;
      cart: TCartSchema;
      stocks: Record<string, TStockSchema>;
      warning?: string;
    }
  | { ok: false; error: string };
