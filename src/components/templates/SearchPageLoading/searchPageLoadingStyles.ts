export const classes = {
  header: "mb-6",
  controlsRow:
    "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between",
  resultsWrap: "mt-8",
  clearSkeleton:
    "order-1 h-4 w-24 self-start rounded skeleton sm:order-2 sm:mt-2",
  searchColumn: "flex flex-1 flex-col gap-2 sm:gap-0",
  titleSkeleton: "h-8 w-56 rounded skeleton",
  root: "mx-auto max-w-6xl px-4 py-8 md:py-12",
  subtitleSkeleton: "mt-2 h-4 w-72 rounded skeleton",
  searchInputSkeleton:
    "order-2 h-10 w-full rounded skeleton sm:order-1",
  submitSkeleton: "h-10 w-full rounded skeleton sm:w-28",
  categorySkeleton: "h-10 w-full rounded skeleton sm:w-56",
} as const;
