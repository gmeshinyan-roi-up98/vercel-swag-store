const pagerFocusVisible =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2";

const pagerArrowCell =
  `inline-flex size-9 shrink-0 select-none items-center justify-center rounded-md border border-border bg-background text-sm font-medium shadow-sm transition-[color,box-shadow,background-color,border-color] hover:border-muted-foreground/35 hover:bg-muted hover:shadow ${pagerFocusVisible}`;

const pagerPageLinkCore =
  `inline-flex h-9 min-w-9 shrink-0 select-none items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium shadow-sm transition-[color,box-shadow,background-color,border-color] ${pagerFocusVisible}`;

export const classes = {
  clusterPending:
    "pointer-events-none cursor-not-allowed select-none [&_a]:pointer-events-none",
  controlDimmed: "opacity-45",
  controlPendingTarget:
    "border-accent bg-accent text-accent-foreground shadow-md ring-2 ring-inset ring-white/35 focus-visible:ring-offset-background",
  navArrowDisabled:
    "pointer-events-none inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted-foreground opacity-50",
  ellipsis: "px-2 text-sm text-muted-foreground",
  cluster: "flex flex-wrap items-center justify-center gap-2",
  navArrowInteractive: pagerArrowCell,
  pageLinkActive:
    "border-accent bg-accent text-accent-foreground shadow-sm hover:border-accent hover:bg-accent/90 hover:text-accent-foreground hover:shadow",
  pageLinkIdle:
    "text-foreground hover:border-muted-foreground/40 hover:bg-muted hover:shadow-sm",
  nav: "pagination-nav mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4",
  pageLink: pagerPageLinkCore,
  navIcon: "h-4 w-4 shrink-0",
  pageList: "flex flex-wrap items-center justify-center gap-2",
} as const;
