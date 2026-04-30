import type { TCartSchema, TStockSchema } from "@/lib/schemas";

export type TCartHydratorProps = {
  cart: TCartSchema | null;
};

export type TStockHydratorProps = {
  productId: string;
  stock: TStockSchema | null;
};

export type TNoticeHydratorProps = {
  notice: string | null;
};

export type TReconcileCartAgainstStockParams = {
  token: string;
  cart: TCartSchema;
};

export type TReconcileCartAgainstStockResult = {
  cart: TCartSchema;
  notice: string | null;
  stocks: Record<string, TStockSchema>;
};
