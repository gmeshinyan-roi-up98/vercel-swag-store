"use server";

import {
  addItemToCart,
  getCart,
  removeCartItem as removeCartItemApi,
  updateCartItem as updateCartItemApi,
} from "@/lib/api/cart";
import { getProductStock } from "@/lib/api/stock";
import { ensureCartToken, getCartToken } from "@/lib/cart/session";
import {
  addToCartInputSchema,
  removeCartItemInputSchema,
  updateCartItemInputSchema,
} from "@/lib/schemas";

import { findItem, handleError, reconcileItem, stocksFor } from "./helpers";
import type { CartActionResult } from "./types";

export const addToCartAction = async (input: {
  productId: string;
  quantity: number;
}): Promise<CartActionResult> => {
  const parsed = addToCartInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    const token = await ensureCartToken();
    const { productId, quantity } = parsed.data;

    const [stock, currentCart] = await Promise.all([
      getProductStock(productId),
      getCart(token),
    ]);

    if (!stock || !stock.inStock || stock.stock === 0) {
      let cart = currentCart;
      if (cart && findItem(cart, productId)) {
        cart = await removeCartItemApi(token, productId);
      }
      if (!cart) return { ok: false, error: "Out of stock." };
      return {
        ok: true,
        cart,
        stocks: stocksFor(productId, stock),
        warning: "Item is out of stock.",
      };
    }

    const existingQty = currentCart
      ? findItem(currentCart, productId)?.quantity ?? 0
      : 0;
    const desiredTotal = existingQty + quantity;
    const cappedTotal = Math.min(desiredTotal, stock.stock);
    const toAdd = cappedTotal - existingQty;

    if (toAdd <= 0) {
      return {
        ok: true,
        cart: currentCart ?? (await getCart(token))!,
        stocks: stocksFor(productId, stock),
        warning: `Stock limit reached (${stock.stock} max).`,
      };
    }

    const cartAfterAdd = await addItemToCart(token, productId, toAdd);

    const reconciled = await reconcileItem({
      token,
      productId,
      cart: cartAfterAdd,
    });

    const wasClamped = toAdd < quantity;
    const wasReducedByReconcile =
      findItem(cartAfterAdd, productId)?.quantity !==
      findItem(reconciled.cart, productId)?.quantity;

    return {
      ok: true,
      cart: reconciled.cart,
      stocks: stocksFor(productId, reconciled.stock ?? stock),
      warning:
        wasClamped || wasReducedByReconcile
          ? `Only ${
              reconciled.stock?.stock ?? stock.stock
            } in stock — quantity adjusted.`
          : undefined,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const updateCartItemAction = async (input: {
  productId: string;
  quantity: number;
}): Promise<CartActionResult> => {
  const parsed = updateCartItemInputSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    const token = await getCartToken();
    if (!token) return { ok: false, error: "No active cart." };

    const { productId, quantity } = parsed.data;

    if (quantity === 0) {
      const [cart, stock] = await Promise.all([
        removeCartItemApi(token, productId),
        getProductStock(productId),
      ]);

      return { ok: true, cart, stocks: stocksFor(productId, stock) };
    }

    const stock = await getProductStock(productId);
    if (!stock || !stock.inStock || stock.stock === 0) {
      const cart = await removeCartItemApi(token, productId);
      return {
        ok: true,
        cart,
        stocks: stocksFor(productId, stock),
        warning: "Item went out of stock — removed from your cart.",
      };
    }

    const finalQty = Math.min(quantity, stock.stock);
    const cart = await updateCartItemApi(token, productId, finalQty);

    return {
      ok: true,
      cart,
      stocks: stocksFor(productId, stock),
      warning:
        finalQty < quantity
          ? `Only ${stock.stock} available — quantity adjusted.`
          : undefined,
    };
  } catch (error) {
    return handleError(error);
  }
};

export const removeFromCartAction = async (input: {
  productId: string;
}): Promise<CartActionResult> => {
  const parsed = removeCartItemInputSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    const token = await getCartToken();
    if (!token) return { ok: false, error: "No active cart." };

    const [cart, stock] = await Promise.all([
      removeCartItemApi(token, parsed.data.productId),
      getProductStock(parsed.data.productId),
    ]);
    return { ok: true, cart, stocks: stocksFor(parsed.data.productId, stock) };
  } catch (error) {
    return handleError(error);
  }
};
