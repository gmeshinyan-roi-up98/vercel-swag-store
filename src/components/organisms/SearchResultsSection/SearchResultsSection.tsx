import Link from "next/link";

import { cn, buildSearchPath } from "@/lib";
import { searchProducts } from "@/lib/api/products";
import { Pagination } from "@/components/molecules/Pagination";
import { ProductGrid } from "@/components/molecules/ProductGrid";
import { EmptySearchState } from "@/components/molecules/EmptySearchState";

import { SEARCH_RESULTS_MESSAGES_CONSTANTS } from "./searchResultsSection.const";
import { classes } from "./searchResultsSectionStyles";
import {
  hasSearchFilter,
  getSearchRequestLimit,
  getEmptySearchDescription,
  isSearchEmptyStateOutOfRange,
} from "./searchResultsSection.utils";
import type { TSearchResultsSectionProps } from "./types";

export const SearchResultsSection = async ({
  page,
  query,
  category,
  className,
}: TSearchResultsSectionProps) => {
  const hasFilter = hasSearchFilter({ query, category });
  const limit = getSearchRequestLimit({ query, category });
  const effectivePage = hasFilter ? 1 : page;

  const { products, pagination } = await searchProducts({
    query,
    page: effectivePage,
    limit,
    category,
  });

  if (products.length === 0) {
    return (
      <EmptySearchState
        title={SEARCH_RESULTS_MESSAGES_CONSTANTS.EMPTY_TITLE}
        description={getEmptySearchDescription({
          page: effectivePage,
          hasFilter,
        })}
        footer={
          isSearchEmptyStateOutOfRange({ page: effectivePage }) ? (
            <Link
              href={buildSearchPath({ query, category, page: 1 })}
              className={classes.viewFirstPageLink}
            >
              {SEARCH_RESULTS_MESSAGES_CONSTANTS.VIEW_FIRST_PAGE_LABEL}
            </Link>
          ) : undefined
        }
      />
    );
  }

  return (
    <div className={cn(classes.root, className)}>
      <ProductGrid products={products} prioritizeFirst />
      {pagination && !hasFilter ? (
        <Pagination pagination={pagination} query={query} category={category} />
      ) : null}
    </div>
  );
};
