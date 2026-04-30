import { classes } from "./promotionBannerSkeletonStyles";
import { PROMOTION_BANNER_SKELETON_CONSTANTS } from "./promotionBannerSkeleton.const";

export const PromotionBannerSkeleton = () => (
  <aside
    role="complementary"
    className={classes.aside}
    aria-label={PROMOTION_BANNER_SKELETON_CONSTANTS.ARIA_LABEL}
  >
    <div className={classes.inner}>
      <div className={classes.lead}>
        <div className={classes.lineWide} />
        <div className={classes.lineWideHiddenSm} />
      </div>
      <div className={classes.lineBadge} />
    </div>
  </aside>
);
