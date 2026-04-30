"use client";

import { useState, useContext, createContext, type ReactNode } from "react";
import type { TCartUIContextValue } from "./types";

const CartUIContext = createContext<TCartUIContextValue | null>(null);

export const CartUIProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((value) => !value);

  return (
    <CartUIContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </CartUIContext.Provider>
  );
};

export const useCartUI = (): TCartUIContextValue => {
  const ctx = useContext(CartUIContext);

  if (!ctx) throw new Error("useCartUI must be used inside <CartUIProvider />");

  return ctx;
};
