import "server-only";

import {
  removeCartItem as removeCartItemApi,
  updateCartItem as updateCartItemApi,
} from "@/lib/api/cart";
import { getProductStock } from "@/lib/api/stock";
import type { TCartSchema, TStockSchema } from "@/lib/schemas";

import type { CartActionResult } from "./types";

export const handleError = (error: unknown): CartActionResult => {
  if (error instanceof Error) return { ok: false, error: error.message };

  return { ok: false, error: "Something went wrong." };
};

export const findItem = (cart: TCartSchema, productId: string) =>
  cart.items.find((i) => i.productId === productId);

export const reconcileItem = async ({
  token,
  productId,
  cart,
}: {
  token: string;
  productId: string;
  cart: TCartSchema;
}): Promise<{ cart: TCartSchema; stock: TStockSchema | null }> => {
  const stock = await getProductStock(productId);
  const item = findItem(cart, productId);
  if (!item || !stock) return { cart, stock };

  if (!stock.inStock || stock.stock === 0) {
    const newCart = await removeCartItemApi(token, productId);
    return { cart: newCart, stock };
  }
  if (item.quantity > stock.stock) {
    const newCart = await updateCartItemApi(token, productId, stock.stock);
    return { cart: newCart, stock };
  }
  return { cart, stock };
};

export const stocksFor = (productId: string, stock: TStockSchema | null) =>
  stock ? { [productId]: stock } : {};
