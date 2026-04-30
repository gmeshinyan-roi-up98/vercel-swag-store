import { ProductCard } from "../ProductCard";

import { classes } from "./productGridStyles";
import type { TProductGridProps } from "./types";

export const ProductGrid = ({
  products,
  prioritizeFirst = false,
  showFeaturedBadge = false,
}: TProductGridProps) => (
  <ul className={classes.grid}>
    {products.map((product, index) => (
      <li key={product.id} className={classes.item}>
        <ProductCard
          product={product}
          priority={prioritizeFirst && index < 4}
          showFeaturedBadge={showFeaturedBadge}
        />
      </li>
    ))}
  </ul>
);
