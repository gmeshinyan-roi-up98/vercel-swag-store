import type { TCartItemSchema } from "@/lib/schemas";

import type {
  TFindMaxedCartLineItemParams,
  TGetCanIncreaseByProductIdParams,
  TGetCartMaxQuantityWarningParams,
} from "./types";

export const getCanIncreaseByProductId = ({
  getStock,
  items,
}: TGetCanIncreaseByProductIdParams) =>
  items.reduce<Record<string, boolean>>((acc, item) => {
    const stock = getStock(item.productId);

    if (!stock) {
      acc[item.productId] = true;

      return acc;
    }

    acc[item.productId] = stock.inStock && item.quantity < stock.stock;
    return acc;
  }, {});

export const findMaxedCartLineItem = ({
  getStock,
  items,
}: TFindMaxedCartLineItemParams): TCartItemSchema | undefined =>
  items.find((item) => {
    const stock = getStock(item.productId);
    return stock && stock.inStock && item.quantity >= stock.stock;
  });

export const getCartMaxQuantityWarning = ({
  maxedItem,
  suffix,
}: TGetCartMaxQuantityWarningParams) =>
  maxedItem ? `${maxedItem.product.name}: ${suffix}` : null;
