import { ProductCardSkeleton } from "../ProductCardSkeleton";

import { classes } from "../../ProductGrid/productGridStyles";
import type { TProductGridSkeletonProps } from "../../ProductGrid/types";

export const ProductGridSkeleton = ({
  count = 6,
}: TProductGridSkeletonProps) => (
  <ul className={classes.grid}>
    {Array.from({ length: count }).map((_, i) => (
      <li key={i} className={classes.item}>
        <ProductCardSkeleton />
      </li>
    ))}
  </ul>
);
