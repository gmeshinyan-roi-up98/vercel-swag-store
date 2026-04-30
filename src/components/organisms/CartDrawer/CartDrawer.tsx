"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Button,
  EmptyCart,
  BUTTON_CONSTANTS,
  CartQuantityStepper,
} from "@/components/atoms";
import { cn, formatPrice } from "@/lib";
import { useCartState, useCartUI } from "@/context";
import { CloseIcon, TrashIcon } from "@/components/icons";

import { classes } from "./cartDrawerStyles";
import { useCartDrawerEffects } from "./cartDrawer.hooks";
import { CART_DRAWER_CONSTANTS } from "./cartDrawer.const";
import {
  findMaxedCartLineItem,
  getCanIncreaseByProductId,
  getCartMaxQuantityWarning,
} from "./cartDrawer.utils";
import type { TCartDrawerProps } from "./types";
import { USD_FALLBACK_CURRENCY } from "@/constants";

export const CartDrawer = ({ className }: TCartDrawerProps) => {
  const { isOpen, close } = useCartUI();
  const {
    cart,
    error,
    warning,
    getStock,
    isPending,
    updateItem,
    removeItem,
    clearMessage,
  } = useCartState();

  useCartDrawerEffects({ clearMessage, close, isOpen });

  const items = cart?.items ?? [];
  const subtotal = cart?.subtotal ?? 0;
  const totalItems = cart?.totalItems ?? 0;
  const currency = cart?.currency ?? USD_FALLBACK_CURRENCY;

  const maxedItem = findMaxedCartLineItem({ getStock, items });
  const canIncreaseByProductId = getCanIncreaseByProductId({ getStock, items });
  const maxQuantityWarning = getCartMaxQuantityWarning({
    maxedItem,
    suffix: CART_DRAWER_CONSTANTS.MAX_QUANTITY_ADDED_SUFFIX,
  });

  const itemLabel =
    totalItems === 1
      ? CART_DRAWER_CONSTANTS.ITEM_SINGULAR
      : CART_DRAWER_CONSTANTS.ITEM_PLURAL;

  return (
    <div
      aria-hidden={!isOpen}
      className={cn(classes.root({ isOpen }), className)}
    >
      <div onClick={close} className={classes.overlay({ isOpen })} />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={CART_DRAWER_CONSTANTS.DIALOG_LABEL}
        className={classes.aside({ isOpen })}
      >
        <header className={classes.header}>
          <div>
            <h2 className={classes.title}>Your cart</h2>
            <p className={classes.titleMeta}>
              {totalItems} {itemLabel}
            </p>
          </div>
          <Button
            type="button"
            onClick={close}
            className={classes.closeButton}
            variant={BUTTON_CONSTANTS.VARIANTS.GHOST}
            aria-label={CART_DRAWER_CONSTANTS.CLOSE_LABEL}
          >
            <CloseIcon />
          </Button>
        </header>

        {(warning || error || maxQuantityWarning) && isOpen ? (
          <div
            role="status"
            className={classes.alert({ hasError: Boolean(error) })}
          >
            {error ?? warning ?? maxQuantityWarning}
          </div>
        ) : null}

        <div className={classes.body}>
          {items.length === 0 ? (
            <EmptyCart onClose={close} />
          ) : (
            <ul className={classes.list}>
              {items.map((item) => {
                const handleRemove = () => {
                  removeItem(item.productId);
                };

                const handleQuantityChange = (next: number) => {
                  updateItem(item.productId, next);
                };

                return (
                  <li key={item.productId} className={classes.listItem}>
                    <div className={classes.imageWrap}>
                      {item.product.images[0] && (
                        <Image
                          fill
                          sizes="80px"
                          alt={item.product.name}
                          className={classes.image}
                          src={item.product.images[0]}
                        />
                      )}
                    </div>

                    <div className={classes.itemInfo}>
                      <div className={classes.itemTopRow}>
                        <Link
                          onClick={close}
                          className={classes.itemLink}
                          href={`/products/${item.product.slug}`}
                        >
                          {item.product.name}
                        </Link>
                        <Button
                          type="button"
                          disabled={isPending}
                          onClick={handleRemove}
                          className={classes.removeButton}
                          variant={BUTTON_CONSTANTS.VARIANTS.GHOST}
                          aria-label={`${CART_DRAWER_CONSTANTS.REMOVE_LABEL_PREFIX} ${item.product.name}`}
                        >
                          <TrashIcon width={16} height={16} />
                        </Button>
                      </div>

                      <p className={classes.itemPrice}>
                        {formatPrice(item.product.price, currency)}{" "}
                        {CART_DRAWER_CONSTANTS.EACH_SUFFIX}
                      </p>

                      <div className={classes.itemBottomRow}>
                        <CartQuantityStepper
                          value={item.quantity}
                          onChange={handleQuantityChange}
                          canIncrease={canIncreaseByProductId[item.productId]}
                          disabled={isPending}
                        />
                        <span className={classes.lineTotal}>
                          {formatPrice(item.lineTotal, currency)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className={classes.footer}>
            <div className={classes.subtotalRow}>
              <span className={classes.subtotalLabel}>
                {CART_DRAWER_CONSTANTS.SUBTOTAL}
              </span>
              <span className={classes.subtotalValue}>
                {formatPrice(subtotal, currency)}
              </span>
            </div>
            <p className={classes.shippingNote}>
              {CART_DRAWER_CONSTANTS.SHIPPING_TAX_NOTE}
            </p>
            <Button
              type="button"
              variant={BUTTON_CONSTANTS.VARIANTS.PRIMARY}
              disabled
              className={classes.checkoutButton}
              title={CART_DRAWER_CONSTANTS.CHECKOUT_TITLE}
            >
              {CART_DRAWER_CONSTANTS.CHECKOUT}
            </Button>
          </footer>
        )}
      </aside>
    </div>
  );
};
