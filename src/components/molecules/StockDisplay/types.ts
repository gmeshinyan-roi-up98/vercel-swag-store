import type { TStockSchema } from "@/lib/schemas";

export type TStockDisplayProps = {
  productId: string;
  initialStock: TStockSchema | null;
};
