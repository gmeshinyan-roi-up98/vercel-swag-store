"use client";

import { MinusIcon, PlusIcon } from "@/components/icons";
import { Button, Input, IconButton, INPUT_CONSTANTS } from "@/components/atoms";

import { classes } from "./addToCartFormStyles";
import type { TAddToCartFormProps } from "./types";
import { useAddToCartForm } from "./addToCartForm.hooks";
import { ADD_TO_CART_FORM_CONSTANTS } from "./addToCartForm.const";

export const AddToCartForm = ({
  productId,
  initialStock,
}: TAddToCartFormProps) => {
  const {
    cap,
    error,
    inCart,
    quantity,
    inputValue,
    handleAdd,
    buttonLabel,
    isOutOfStock,
    handleDecrease,
    availableToAdd,
    buttonDisabled,
    handleIncrease,
    handleQuantityBlur,
    handleQuantityChange,
  } = useAddToCartForm({ productId, initialStock });

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <div className={classes.stepper}>
          <IconButton
            onClick={handleDecrease}
            disabled={buttonDisabled || quantity <= 1}
            aria-label={ADD_TO_CART_FORM_CONSTANTS.DECREASE_QUANTITY_ARIA}
          >
            <MinusIcon width={14} height={14} />
          </IconButton>
          <Input
            min={1}
            max={cap}
            type="number"
            value={inputValue}
            inputMode="numeric"
            disabled={buttonDisabled}
            onBlur={handleQuantityBlur}
            onChange={handleQuantityChange}
            variant={INPUT_CONSTANTS.VARIANTS.QUANTITY}
            aria-label={ADD_TO_CART_FORM_CONSTANTS.QUANTITY_INPUT_ARIA}
          />
          <IconButton
            onClick={handleIncrease}
            disabled={buttonDisabled || quantity >= cap}
            aria-label={ADD_TO_CART_FORM_CONSTANTS.INCREASE_QUANTITY_ARIA}
          >
            <PlusIcon width={14} height={14} />
          </IconButton>
        </div>

        <Button
          variant="primary"
          onClick={handleAdd}
          disabled={buttonDisabled}
          className={classes.submitButton}
        >
          {buttonLabel}
        </Button>
      </div>

      {inCart > 0 && !isOutOfStock && (
        <p className={classes.hint}>
          {inCart}
          {ADD_TO_CART_FORM_CONSTANTS.IN_YOUR_CART_LINE}
          {Number.isFinite(availableToAdd) &&
            availableToAdd > 0 &&
            `${ADD_TO_CART_FORM_CONSTANTS.MORE_AVAILABLE_SEPARATOR}${availableToAdd}${ADD_TO_CART_FORM_CONSTANTS.MORE_AVAILABLE_SUFFIX}`}
        </p>
      )}

      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
};
