import "server-only";

import {
  removeCartItem as removeCartItemApi,
  updateCartItem as updateCartItemApi,
} from "@/lib/api/cart";
import { getProductStock } from "@/lib/api/stock";
import type { TStockSchema } from "@/lib/schemas";

import { CART_SERVER_CONSTANTS } from "./cartServer.const";
import type {
  TReconcileCartAgainstStockParams,
  TReconcileCartAgainstStockResult,
} from "../types";

export const reconcileCartAgainstStock = async ({
  token,
  cart,
}: TReconcileCartAgainstStockParams): Promise<TReconcileCartAgainstStockResult> => {
  if (cart.items.length === 0) return { cart, stocks: {}, notice: null };

  const observations = await Promise.all(
    cart.items.map(async (item) => ({
      item,
      stock: await getProductStock(item.productId),
    }))
  );

  const stocks: Record<string, TStockSchema> = {};

  const removed: string[] = [];
  const clamped: string[] = [];

  let result = cart;

  for (const { item, stock } of observations) {
    if (!stock) continue;
    stocks[item.productId] = stock;

    if (!stock.inStock || stock.stock === 0) {
      result = await removeCartItemApi(token, item.productId);

      removed.push(item.product.name);
    } else if (item.quantity > stock.stock) {
      result = await updateCartItemApi(token, item.productId, stock.stock);

      clamped.push(item.product.name);
    }
  }

  let notice: string | null = null;

  if (removed.length > 0 && clamped.length > 0) {
    notice = `Stock changed — removed ${removed.length} item${
      removed.length === 1 ? "" : "s"
    } and adjusted ${clamped.length}.`;
  } else if (removed.length === 1) {
    notice = `${removed[0]} ${CART_SERVER_CONSTANTS.REMOVED_SINGULAR_SUFFIX}`;
  } else if (removed.length > 1) {
    notice = `${removed.length} ${CART_SERVER_CONSTANTS.REMOVED_PLURAL_SUFFIX}`;
  } else if (clamped.length === 1) {
    notice = `${clamped[0]} ${CART_SERVER_CONSTANTS.CLAMPED_SINGULAR_SUFFIX}`;
  } else if (clamped.length > 1) {
    notice = `${clamped.length} ${CART_SERVER_CONSTANTS.CLAMPED_PLURAL_SUFFIX}`;
  }

  return { cart: result, stocks, notice };
};
