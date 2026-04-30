"use client";

import { useEffect } from "react";

import { useCartState } from "@/context/cart";

import type {
  TCartHydratorProps,
  TStockHydratorProps,
  TNoticeHydratorProps,
} from "./types";

export const CartHydrator = ({ cart }: TCartHydratorProps) => {
  const { hydrateCart } = useCartState();

  useEffect(() => {
    hydrateCart(cart);
  }, [cart, hydrateCart]);

  return <span hidden />;
};

export const StockHydrator = ({ productId, stock }: TStockHydratorProps) => {
  const { hydrateStock } = useCartState();

  useEffect(() => {
    hydrateStock(productId, stock);
  }, [productId, stock, hydrateStock]);

  return <span hidden />;
};

export const NoticeHydrator = ({ notice }: TNoticeHydratorProps) => {
  const { hydrateNotice } = useCartState();

  useEffect(() => {
    hydrateNotice(notice);
  }, [notice, hydrateNotice]);

  return <span hidden />;
};
