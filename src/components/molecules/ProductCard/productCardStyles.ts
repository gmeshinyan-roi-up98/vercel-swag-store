export const classes = {
  mediaWrap: "relative aspect-square w-full shrink-0 bg-muted",
  link: "card group flex h-full min-h-0 w-full flex-col overflow-hidden transition hover:border-foreground/20 hover:shadow-sm",
  image:
    "object-cover transition-transform duration-300 group-hover:scale-[1.02]",
  featuredBadge:
    "pointer-events-none absolute right-2 top-2 z-10 rounded-full border border-border bg-background/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground shadow-sm backdrop-blur-sm",
  body: "flex min-h-0 flex-1 flex-col gap-1 p-3",
  category:
    "shrink-0 text-[11px] uppercase tracking-wide text-muted-foreground",
  price: "mt-auto pt-2 text-sm font-semibold",
  skeletonLineSm: "h-3 w-1/3 rounded skeleton",
  skeletonLineMd: "h-4 w-3/4 rounded skeleton",
  skeletonLinePrice: "h-4 w-1/4 rounded skeleton",
  title: "line-clamp-2 text-sm font-medium leading-snug",
  skeletonMedia: "aspect-square w-full shrink-0 skeleton",
  skeletonBody: "flex min-h-0 flex-1 flex-col space-y-2 p-3",
  skeletonRoot: "card flex h-full min-h-0 w-full flex-col overflow-hidden",
} as const;
