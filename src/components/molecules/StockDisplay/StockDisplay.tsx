"use client";

import { useCartState } from "@/context/cart";

import { STOCK_DISPLAY_CONSTANTS } from "./stockDisplay.const";
import { classes } from "./stockDisplayStyles";
import type { TStockDisplayProps } from "./types";

export const StockDisplay = ({
  productId,
  initialStock,
}: TStockDisplayProps) => {
  const { getStock, getQuantity } = useCartState();
  const stock = getStock(productId) ?? initialStock;

  if (!stock) {
    return (
      <span className={classes.mutedRow}>
        {STOCK_DISPLAY_CONSTANTS.STOCK_UNAVAILABLE}
      </span>
    );
  }

  const inCart = getQuantity(productId);
  const remaining = Math.max(0, stock.stock - inCart);

  if (!stock.inStock || stock.stock === 0) {
    return (
      <span className={classes.dangerRow}>
        <span className={classes.dotDanger} aria-hidden />
        {STOCK_DISPLAY_CONSTANTS.OUT_OF_STOCK}
      </span>
    );
  }

  if (remaining === 0) {
    return (
      <span className={classes.warningRow}>
        <span className={classes.dotWarning} aria-hidden />
        Max already in your cart ({inCart})
      </span>
    );
  }

  if (stock.lowStock || remaining <= 5) {
    return (
      <span className={classes.warningRow}>
        <span className={classes.dotWarning} aria-hidden />
        Only {remaining} left
        {inCart > 0 ? ` (you already have ${inCart})` : ""}
      </span>
    );
  }

  return (
    <span className={classes.successRow}>
      <span className={classes.dotSuccess} aria-hidden />
      In stock ({remaining} available
      {inCart > 0 ? `, ${inCart} in your cart` : ""})
    </span>
  );
};
