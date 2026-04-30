export type TSearchPageTemplateProps = {
  results: React.ReactNode;
  initialQuery: string;
  initialCategory: string;
  categories: ReadonlyArray<{ slug: string; name: string }>;
};
