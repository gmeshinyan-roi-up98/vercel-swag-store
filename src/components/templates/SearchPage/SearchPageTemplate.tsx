import { SearchControls } from "@/components/molecules/SearchControls";

import { classes } from "./searchPageTemplateStyles";
import type { TSearchPageTemplateProps } from "./types";
import { SEARCH_PAGE_TEMPLATE_CONSTANTS } from "./searchPageTemplate.const";

export const SearchPageTemplate = ({
  results,
  categories,
  initialQuery,
  initialCategory,
}: TSearchPageTemplateProps) => (
  <section className={classes.root}>
    <header className={classes.header}>
      <h1 className={classes.title}>{SEARCH_PAGE_TEMPLATE_CONSTANTS.TITLE}</h1>
      <p className={classes.subtitle}>
        {SEARCH_PAGE_TEMPLATE_CONSTANTS.SUBTITLE}
      </p>
    </header>

    <SearchControls
      categories={categories}
      initialQuery={initialQuery}
      initialCategory={initialCategory}
    />

    <div className={classes.resultsWrap}>{results}</div>
  </section>
);
