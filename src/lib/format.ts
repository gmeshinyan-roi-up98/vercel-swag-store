import { USD_FALLBACK_CURRENCY } from "@/constants";

export const formatPrice = (
  cents: number,
  currency = USD_FALLBACK_CURRENCY
): string =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(cents / 100);

export const formatCategory = (slug: string): string =>
  slug
    .split("-")
    .map((productCategory) =>
      productCategory.length === 0
        ? productCategory
        : productCategory[0]!.toUpperCase() + productCategory.slice(1)
    )
    .join(" ");
