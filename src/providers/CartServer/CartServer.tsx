import "server-only";

import type { TStockSchema } from "@/lib/schemas";
import { getCartToken, readCart } from "@/lib/cart/session";

import { CartHydrator, NoticeHydrator, StockHydrator } from "../CartHydrators";

import { reconcileCartAgainstStock } from "./helpers";

export const CartHydratorServer = async () => {
  let cart = await readCart();
  let stocks: Record<string, TStockSchema> = {};
  let notice: string | null = null;

  if (cart && cart.items.length > 0) {
    const token = await getCartToken();
    if (token) {
      try {
        const reconciled = await reconcileCartAgainstStock({ token, cart });

        cart = reconciled.cart;
        stocks = reconciled.stocks;
        notice = reconciled.notice;
      } catch {
        void 0;
      }
    }
  }

  return (
    <>
      <CartHydrator cart={cart} />
      <NoticeHydrator notice={notice} />
      {Object.entries(stocks).map(([productId, stock]) => (
        <StockHydrator key={productId} productId={productId} stock={stock} />
      ))}
    </>
  );
};
