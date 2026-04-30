import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { ProductGrid } from "@/components/molecules/ProductGrid";
import { PAGE_SECTION_IDS, ROUTES } from "@/constants";

import { HOME_FEATURED_SECTION_CONSTANTS } from "./homeFeaturedSection.const";
import { classes } from "./homeFeaturedSectionStyles";
import type { THomeFeaturedSectionProps } from "./types";

export const HomeFeaturedSection = ({ products }: THomeFeaturedSectionProps) => (
  <section id={PAGE_SECTION_IDS.HOME_FEATURED} className={classes.featuredSection}>
    <div className={classes.featuredHeaderRow}>
      <div>
        <h2 className={classes.featuredHeading}>
          {HOME_FEATURED_SECTION_CONSTANTS.FEATURED_HEADING}
        </h2>
        <p className={classes.featuredSubtitle}>
          {HOME_FEATURED_SECTION_CONSTANTS.FEATURED_SUBTITLE}
        </p>
      </div>
      <Link href={ROUTES.SEARCH} className={classes.viewAllLink}>
        {HOME_FEATURED_SECTION_CONSTANTS.VIEW_ALL}
        <ArrowRightIcon width={14} height={14} />
      </Link>
    </div>

    {products.length > 0 ? (
      <ProductGrid products={products} prioritizeFirst showFeaturedBadge />
    ) : (
      <p className={classes.featuredEmpty}>
        {HOME_FEATURED_SECTION_CONSTANTS.FEATURED_EMPTY}
      </p>
    )}
  </section>
);
