import { SparkleIcon } from "@/components/icons";
import { getActivePromotion } from "@/lib/api/promotions";

import { classes } from "./homePromotionBannerStyles";
import { HOME_PROMOTION_BANNER_CONSTANTS } from "./homePromotionBanner.const";

export const HomePromotionBanner = async () => {
  const promo = await getActivePromotion();

  if (!promo || !promo.active) return null;

  return (
    <aside
      role="complementary"
      aria-label={HOME_PROMOTION_BANNER_CONSTANTS.PROMOTION_ARIA}
      className={classes.promotionAside}
    >
      <div className={classes.promotionInner}>
        <div className={classes.promotionLead}>
          <SparkleIcon width={16} height={16} />
          <span className={classes.promotionTitle}>{promo.title}</span>
          <span className={classes.promotionDescription}>
            — {promo.description}
          </span>
        </div>
        <code className={classes.promotionCode}>{promo.code}</code>
      </div>
    </aside>
  );
};
