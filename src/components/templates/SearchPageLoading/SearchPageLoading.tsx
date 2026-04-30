import { SEARCH_PAGE_SIZE } from "@/lib/api/products";
import { ProductGridSkeleton } from "@/components/molecules/ProductGrid";

import { classes } from "./searchPageLoadingStyles";

export const SearchPageLoadingTemplate = () => (
  <section aria-hidden className={classes.root}>
    <header className={classes.header}>
      <div className={classes.titleSkeleton} />
      <div className={classes.subtitleSkeleton} />
    </header>

    <div className={classes.controlsRow}>
      <div className={classes.searchColumn}>
        <div className={classes.searchInputSkeleton} />
        <div className={classes.clearSkeleton} />
      </div>
      <div className={classes.categorySkeleton} />
      <div className={classes.submitSkeleton} />
    </div>

    <div className={classes.resultsWrap}>
      <ProductGridSkeleton count={SEARCH_PAGE_SIZE} />
    </div>
  </section>
);
