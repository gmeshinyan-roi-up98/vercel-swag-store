export type TBuildSearchPathParams = {
  query: string;
  category: string;
} & Partial<{
  page: number;
}>;
