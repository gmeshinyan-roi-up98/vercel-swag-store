import type { TCartSchema, TStockSchema } from "@/lib";

import { type CartActionResult } from "@/lib/cart/actions";

export type CartStateContextValue = {
  cart: TCartSchema | null;
  isPending: boolean;
  error: string | null;
  warning: string | null;
  clearMessage: VoidFunction;
  stocks: Record<string, TStockSchema>;
  hydrateCart: (cart: TCartSchema | null) => void;
  getQuantity: (productId: string) => number;
  hydrateNotice: (notice: string | null) => void;
  getStock: (productId: string) => TStockSchema | undefined;
  getAvailableToAdd: (productId: string) => number;
  hydrateStock: (productId: string, stock: TStockSchema | null) => void;
  addItem: (productId: string, quantity: number) => Promise<CartActionResult>;
  updateItem: (
    productId: string,
    quantity: number
  ) => Promise<CartActionResult>;
  removeItem: (productId: string) => Promise<CartActionResult>;
};
