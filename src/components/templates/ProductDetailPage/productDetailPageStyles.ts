export const classes = {
  article: "mx-auto max-w-6xl px-4 py-8 md:py-12",
  breadcrumbNav: "mb-6 text-xs text-muted-foreground",
  breadcrumbList: "flex flex-wrap items-center gap-1",
  breadcrumbCurrent: "truncate text-foreground",
  grid: "grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12",
  media:
    "relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-muted",
  mediaImage: "object-cover",
  panel: "flex flex-col",
  category: "text-xs uppercase tracking-wide text-muted-foreground",
  title: "mt-1 text-2xl font-semibold tracking-tight md:text-3xl",
  price: "mt-2 text-2xl font-semibold",
  description: "mt-5 text-sm leading-relaxed text-muted-foreground",
  tagsList: "mt-4 flex flex-wrap gap-1.5",
  tag: "rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-foreground/80",
  browseLink:
    "mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground",
} as const;
