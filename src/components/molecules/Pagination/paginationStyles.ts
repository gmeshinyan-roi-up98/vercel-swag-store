const pagerArrowCell =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const pagerPageLinkCore =
  "inline-flex h-9 min-w-9 shrink-0 items-center justify-center rounded-md px-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

export const classes = {
  clusterPending: "pointer-events-none",
  controlDimmed: "opacity-45",
  controlPendingTarget:
    "bg-accent text-accent-foreground ring-2 ring-accent/70 ring-offset-2 ring-offset-background",
  navArrowDisabled:
    "pointer-events-none inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground opacity-50",
  ellipsis: "px-2 text-sm text-muted-foreground",
  cluster: "flex flex-wrap items-center justify-center gap-2",
  navArrowInteractive: pagerArrowCell,
  pageLinkActive:
    "bg-accent text-accent-foreground hover:bg-accent/90 hover:text-accent-foreground",
  pageLinkIdle:
    "text-foreground hover:bg-muted",
  nav: "mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4",
  pageLink: pagerPageLinkCore,
  navIcon: "h-4 w-4 shrink-0",
  pageList: "flex flex-wrap items-center justify-center gap-2",
} as const;
