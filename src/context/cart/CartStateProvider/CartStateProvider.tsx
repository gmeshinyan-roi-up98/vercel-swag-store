"use client";

import {
  useState,
  useContext,
  createContext,
  useTransition,
  type ReactNode,
} from "react";

import type { TCartSchema, TStockSchema } from "@/lib";

import {
  addToCartAction,
  removeFromCartAction,
  updateCartItemAction,
  type CartActionResult,
} from "@/lib/cart/actions";

import type { CartStateContextValue } from "./types";

const CartStateContext = createContext<CartStateContextValue | null>(null);

export const CartStateProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<TCartSchema | null>(null);
  const [stocks, setStocks] = useState<Record<string, TStockSchema>>({});
  const [warning, setWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const hydrateCart = (next: TCartSchema | null) => {
    setCart(next);
  };

  const hydrateNotice = (notice: string | null) => {
    setWarning(notice);
  };

  const hydrateStock = (productId: string, next: TStockSchema | null) => {
    if (!next) return;
    setStocks((prev) => {
      const existing = prev[productId];

      if (
        existing &&
        existing.stock === next.stock &&
        existing.inStock === next.inStock &&
        existing.lowStock === next.lowStock
      ) {
        return prev;
      }
      return { ...prev, [productId]: next };
    });
  };

  const applyResult = (result: CartActionResult) => {
    if (result.ok) {
      setCart(result.cart);

      if (Object.keys(result.stocks).length > 0) {
        setStocks((prev) => ({ ...prev, ...result.stocks }));
      }

      setWarning(result.warning ?? null);
      setError(null);
    } else {
      setError(result.error);
      setWarning(null);
    }
  };

  const runMutation = (
    mutation: () => Promise<CartActionResult>
  ): Promise<CartActionResult> =>
    new Promise((resolve) => {
      startTransition(async () => {
        const result = await mutation();
        applyResult(result);
        resolve(result);
      });
    });

  const addItem = (productId: string, quantity: number) =>
    runMutation(() => addToCartAction({ productId, quantity }));

  const updateItem = (productId: string, quantity: number) =>
    runMutation(() => updateCartItemAction({ productId, quantity }));

  const removeItem = (productId: string) =>
    runMutation(() => removeFromCartAction({ productId }));

  const getQuantity = (productId: string): number => {
    if (!cart) return 0;
    return cart.items.find((i) => i.productId === productId)?.quantity ?? 0;
  };

  const getStock = (productId: string): TStockSchema | undefined =>
    stocks[productId];

  const getAvailableToAdd = (productId: string): number => {
    const stock = stocks[productId];
    if (!stock) return Number.POSITIVE_INFINITY;
    const inCart = getQuantity(productId);
    return Math.max(0, stock.stock - inCart);
  };

  const clearMessage = () => {
    setWarning(null);
    setError(null);
  };

  return (
    <CartStateContext.Provider
      value={{
        cart,
        error,
        stocks,
        warning,
        isPending,
        addItem,
        getStock,
        updateItem,
        hydrateCart,
        removeItem,
        getQuantity,
        hydrateStock,
        clearMessage,
        hydrateNotice,
        getAvailableToAdd,
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = (): CartStateContextValue => {
  const ctx = useContext(CartStateContext);

  if (!ctx) {
    throw new Error("useCartState must be used inside <CartStateProvider />");
  }

  return ctx;
};
