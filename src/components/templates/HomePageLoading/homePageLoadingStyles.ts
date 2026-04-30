export const classes = {
  heroSection: "relative overflow-hidden border-b border-border",
  heroInner:
    "mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24",
  heroCopyStack: "space-y-4",
  heroTitleLine: "h-10 w-full max-w-xl rounded skeleton md:h-12",
  heroSubtitleLine: "h-4 w-full max-w-lg rounded skeleton",
  heroSubtitleLineShort: "h-4 w-2/3 max-w-md rounded skeleton",
  heroActions: "mt-6 flex flex-wrap gap-3",
  heroPrimarySkeleton: "h-10 w-28 rounded skeleton",
  heroSecondarySkeleton: "h-10 w-40 rounded skeleton",
  heroMedia:
    "relative aspect-4/3 min-h-[200px] overflow-hidden rounded-xl border border-border bg-muted md:aspect-square",
  heroMediaFill: "h-full w-full skeleton",
  featuredSection: "mx-auto max-w-6xl px-4 py-12 md:py-16",
  featuredHeader: "mb-6",
  featuredTitleSkeleton: "h-8 w-48 rounded skeleton",
  featuredSubtitleSkeleton: "mt-2 h-4 w-64 rounded skeleton",
} as const;
