export const CACHE_TAGS = {
  products: "products",
  promotion: "promotion",
  categories: "categories",
  storeConfig: "store-config",
  product: (idOrSlug: string) => `product:${idOrSlug}`,
} as const;
