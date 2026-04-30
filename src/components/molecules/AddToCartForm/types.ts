import type { TStockSchema } from "@/lib/schemas";

export type TAddToCartFormProps = {
  productId: string;
  initialStock: TStockSchema | null;
};

export type TGetMaxInCartLabelParams = {
  inCart: number;
};

export type TGetAddToCartButtonLabelParams = {
  inCart: number;
  isAtCap: boolean;
  isPending: boolean;
  isOutOfStock: boolean;
};
