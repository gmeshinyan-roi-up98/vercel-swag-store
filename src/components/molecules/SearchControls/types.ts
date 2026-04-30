export type TSearchControlsProps = Partial<{
  className: string;
}> & {
  initialQuery: string;
  initialCategory: string;
  categories: ReadonlyArray<{ slug: string; name: string }>;
};

export type TBuildSearchHrefParams = {
  query: string;
  category: string;
};

export type TReplaceSearchRouteParams = {
  nextCategory: string;
  nextQuery: string;
};
