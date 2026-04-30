import { cn } from "@/lib";

export const classes = {
  root: cn(
    "relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md !p-0 text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
  ),
  badge: cn(
    "absolute -right-1 -top-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold leading-none text-accent-foreground"
  ),
} as const;
