export const classes = {
  inner: "mx-auto flex h-14 max-w-6xl items-center justify-between px-4",
  root: "sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/70",
  brandLink:
    "inline-flex items-center gap-2 text-sm font-semibold tracking-tight",
  nav: "hidden md:block",
  actions: "flex items-center gap-1",
  navList: "flex items-center gap-1 text-sm",
  navLink: "rounded-md px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  navLinkActive: "font-medium text-foreground",
  navLinkIdle:
    "text-muted-foreground hover:text-foreground/80",
  searchIconLink:
    "inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted md:hidden",
} as const;
