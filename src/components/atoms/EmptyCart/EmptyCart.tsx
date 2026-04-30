import Link from "next/link";

import { CartIcon } from "@/components/icons";

import { classes } from "./emptyCartStyles";
import type { TEmptyCartProps } from "./types";
import { EMPTY_CART_CONSTANTS } from "./emptyCart.const";

export const EmptyCart = ({ onClose }: TEmptyCartProps) => (
  <div className={classes.root}>
    <div className={classes.iconWrap}>
      <CartIcon width={24} height={24} className={classes.icon} />
    </div>
    <h3 className={classes.title}>{EMPTY_CART_CONSTANTS.EMPTY_TITLE}</h3>
    <p className={classes.description}>
      {EMPTY_CART_CONSTANTS.EMPTY_DESCRIPTION}
    </p>
    <Link
      onClick={onClose}
      className={classes.browseLink}
      href={EMPTY_CART_CONSTANTS.SEARCH_PATH}
    >
      {EMPTY_CART_CONSTANTS.BROWSE_PRODUCTS}
    </Link>
  </div>
);
