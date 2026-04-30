import { ADD_TO_CART_FORM_CONSTANTS } from "./addToCartForm.const";
import type {
  TGetMaxInCartLabelParams,
  TGetAddToCartButtonLabelParams,
} from "./types";

export const getMaxInCartLabel = ({ inCart }: TGetMaxInCartLabelParams) =>
  `Max in cart (${inCart})`;

export const getAddToCartButtonLabel = ({
  inCart,
  isAtCap,
  isOutOfStock,
  isPending,
}: TGetAddToCartButtonLabelParams) => {
  if (isOutOfStock) return ADD_TO_CART_FORM_CONSTANTS.OUT_OF_STOCK;
  if (isAtCap) return getMaxInCartLabel({ inCart });
  if (isPending) return ADD_TO_CART_FORM_CONSTANTS.ADDING;

  return ADD_TO_CART_FORM_CONSTANTS.ADD_TO_CART;
};
