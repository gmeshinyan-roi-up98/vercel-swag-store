"use client";

import { type ChangeEvent, useState } from "react";

import { useCartState, useCartUI } from "@/context/cart";

import { getAddToCartButtonLabel } from "./addToCartForm.utils";
import type { TAddToCartFormProps } from "./types";

export const useAddToCartForm = ({
  productId,
  initialStock,
}: TAddToCartFormProps) => {
  const { open } = useCartUI();
  const [inputValue, setInputValue] = useState("1");
  const { addItem, isPending, getStock, getQuantity, error } = useCartState();

  const stock = getStock(productId) ?? initialStock ?? undefined;
  const inCart = getQuantity(productId);
  const availableToAdd = stock
    ? Math.max(0, stock.stock - inCart)
    : Number.POSITIVE_INFINITY;

  const isOutOfStock =
    stock !== undefined && (!stock.inStock || stock.stock === 0);

  const isAtCap = !isOutOfStock && availableToAdd === 0;

  const cap = Math.max(1, Number.isFinite(availableToAdd) ? availableToAdd : 1);

  const parsedInput = Number(inputValue);
  const safeParsedInput = Number.isFinite(parsedInput) ? parsedInput : 1;
  const quantity = Math.min(
    Math.max(1, Math.floor(safeParsedInput) || 1),
    cap,
  );

  const handleAdd = async () => {
    const result = await addItem(productId, quantity);
    if (result.ok) {
      open();
      setInputValue("1");
    }
  };

  const buttonLabel = getAddToCartButtonLabel({
    inCart,
    isAtCap,
    isPending,
    isOutOfStock,
  });

  const buttonDisabled = isOutOfStock || isAtCap || isPending;

  const handleDecrease = () => {
    setInputValue(String(Math.max(1, quantity - 1)));
  };

  const handleIncrease = () => {
    setInputValue(String(Math.min(cap, quantity + 1)));
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleQuantityBlur = () => {
    setInputValue(String(quantity));
  };

  return {
    cap,
    error,
    inCart,
    quantity,
    inputValue,
    handleAdd,
    buttonLabel,
    isOutOfStock,
    buttonDisabled,
    availableToAdd,
    handleIncrease,
    handleDecrease,
    handleQuantityChange,
    handleQuantityBlur,
  };
};
