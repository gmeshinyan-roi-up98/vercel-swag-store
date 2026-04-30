export type TSearchResultsSectionProps = {
  query: string;
  page: number;
  category: string;
} & Partial<{
  className: string;
}>;

export type THasSearchFilterParams = {
  query: string;
  category: string;
};

export type TGetEmptySearchDescriptionParams = {
  page: number;
  hasFilter: boolean;
};

export type TIsSearchEmptyStateOutOfRangeParams = {
  page: number;
};
