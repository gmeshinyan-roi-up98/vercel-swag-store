export const classes = {
  heroSection: "relative overflow-hidden border-b border-border",
  heroInner:
    "mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24",
  heroTitle:
    "text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl",
  heroSubtitle:
    "mt-4 max-w-prose text-pretty text-muted-foreground md:text-lg",
  heroActions: "mt-6 flex flex-wrap gap-3",
  heroMedia:
    "relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-muted md:aspect-square",
  heroMediaImage: "object-cover",
} as const;
