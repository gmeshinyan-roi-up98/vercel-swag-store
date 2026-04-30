import { ProductGridSkeleton } from "@/components/molecules/ProductGrid";
import { PromotionBannerSkeleton } from "@/components/organisms";

import { classes } from "./homePageLoadingStyles";

export const HomePageLoadingTemplate = () => (
  <div aria-hidden="true">
    <section className={classes.heroSection}>
      <div className={classes.heroInner}>
        <div className={classes.heroCopyStack}>
          <div className={classes.heroTitleLine} />
          <div className={classes.heroSubtitleLine} />
          <div className={classes.heroSubtitleLineShort} />
          <div className={classes.heroActions}>
            <div className={classes.heroPrimarySkeleton} />
            <div className={classes.heroSecondarySkeleton} />
          </div>
        </div>
        <div className={classes.heroMedia}>
          <div className={classes.heroMediaFill} />
        </div>
      </div>
    </section>

    <PromotionBannerSkeleton />

    <section className={classes.featuredSection}>
      <div className={classes.featuredHeader}>
        <div className={classes.featuredTitleSkeleton} />
        <div className={classes.featuredSubtitleSkeleton} />
      </div>
      <ProductGridSkeleton count={8} />
    </section>
  </div>
);
