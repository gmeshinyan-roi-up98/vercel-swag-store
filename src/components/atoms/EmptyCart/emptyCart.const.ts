import { ROUTES } from "@/constants";

export const EMPTY_CART_CONSTANTS = {
  SEARCH_PATH: ROUTES.SEARCH,
  BROWSE_PRODUCTS: "Browse products",
  EMPTY_TITLE: "Your cart is empty",
  EMPTY_DESCRIPTION:
    "Discover our latest swag and add something to get started.",
} as const;
