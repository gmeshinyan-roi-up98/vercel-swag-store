import { classes } from "../../ProductCard/productCardStyles";

export const ProductCardSkeleton = () => (
  <div className={classes.skeletonRoot}>
    <div className={classes.skeletonMedia} />
    <div className={classes.skeletonBody}>
      <div className={classes.skeletonLineSm} />
      <div className={classes.skeletonLineMd} />
      <div className={classes.skeletonLinePrice} />
    </div>
  </div>
);
