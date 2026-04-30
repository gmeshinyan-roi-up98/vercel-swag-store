import { cn } from "@/lib";

import { classes } from "./productStockSectionSkeletonStyles";
import type { TProductStockSectionSkeletonProps } from "./types";

export const ProductStockSectionSkeleton = ({
  className,
}: TProductStockSectionSkeletonProps) => (
  <div className={cn(classes.root, className)}>
    <div className={classes.stockSkeleton} />
    <div className={classes.actionsRow}>
      <div className={classes.qtySkeleton} />
      <div className={classes.ctaSkeleton} />
    </div>
  </div>
);
