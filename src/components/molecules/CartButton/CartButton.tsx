"use client";

import { cn } from "@/lib";
import { CartIcon } from "@/components/icons";
import { useCartState, useCartUI } from "@/context";
import { Button, BUTTON_CONSTANTS } from "@/components/atoms/Button";

import { classes } from "./cartButtonStyles";
import type { TCartButtonProps } from "./types";
import { CART_BUTTON_CONSTANTS } from "./cartButton.const";

export const CartButton = ({ className }: TCartButtonProps) => {
  const { open } = useCartUI();
  const { cart } = useCartState();

  const count = cart?.totalItems ?? 0;

  const itemLabel =
    count === 1
      ? CART_BUTTON_CONSTANTS.ITEM_SINGULAR
      : CART_BUTTON_CONSTANTS.ITEM_PLURAL;

  const ariaLabel = `${CART_BUTTON_CONSTANTS.OPEN_CART_LABEL}, ${count} ${itemLabel}`;

  const badgeLabel =
    count > CART_BUTTON_CONSTANTS.BADGE_MAX
      ? CART_BUTTON_CONSTANTS.BADGE_MAX_LABEL
      : count;

  return (
    <Button
      type="button"
      onClick={open}
      aria-label={ariaLabel}
      className={cn(classes.root, className)}
      variant={BUTTON_CONSTANTS.VARIANTS.GHOST}
    >
      <CartIcon />
      {count > 0 && (
        <span aria-hidden="true" className={classes.badge}>
          {badgeLabel}
        </span>
      )}
    </Button>
  );
};
