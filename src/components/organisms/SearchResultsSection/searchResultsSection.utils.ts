import { SEARCH_PAGE_SIZE } from "@/lib/api/products";

import {
  SEARCH_RESULTS_MESSAGES_CONSTANTS,
  SEARCH_RESULTS_SECTION_CONSTANTS,
} from "./searchResultsSection.const";
import type {
  THasSearchFilterParams,
  TGetEmptySearchDescriptionParams,
  TIsSearchEmptyStateOutOfRangeParams,
} from "./types";

export const hasSearchFilter = ({
  query,
  category,
}: THasSearchFilterParams): boolean => query.length > 0 || category.length > 0;

export const getSearchRequestLimit = ({
  query,
  category,
}: THasSearchFilterParams): number =>
  hasSearchFilter({ query, category })
    ? SEARCH_RESULTS_SECTION_CONSTANTS.FILTERED_SEARCH_PAGE_SIZE
    : SEARCH_PAGE_SIZE;

export const getEmptySearchDescription = ({
  page,
  hasFilter,
}: TGetEmptySearchDescriptionParams): string => {
  if (page > 1) {
    return SEARCH_RESULTS_MESSAGES_CONSTANTS.OUT_OF_RANGE_DESCRIPTION;
  }
  if (hasFilter) {
    return SEARCH_RESULTS_MESSAGES_CONSTANTS.FILTER_EMPTY_DESCRIPTION;
  }
  return SEARCH_RESULTS_MESSAGES_CONSTANTS.CATALOG_EMPTY_DESCRIPTION;
};

export const isSearchEmptyStateOutOfRange = ({
  page,
}: TIsSearchEmptyStateOutOfRangeParams): boolean => page > 1;
