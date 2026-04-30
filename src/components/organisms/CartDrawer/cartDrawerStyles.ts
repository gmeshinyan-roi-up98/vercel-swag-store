import { cn } from "@/lib";

import type { TAlertStateParams, TDrawerStateParams } from "./types";

export const classes = {
  root: ({ isOpen }: TDrawerStateParams) =>
    cn("fixed inset-0 z-50", isOpen ? "" : "pointer-events-none"),
  overlay: ({ isOpen }: TDrawerStateParams) =>
    cn(
      "absolute inset-0 bg-black/40 transition-opacity duration-200",
      isOpen ? "opacity-100" : "opacity-0"
    ),
  aside: ({ isOpen }: TDrawerStateParams) =>
    cn(
      "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-xl transition-transform duration-300 ease-out",
      isOpen ? "translate-x-0" : "translate-x-full"
    ),
  header: "flex items-center justify-between border-b border-border px-5 py-4",
  title: "text-base font-semibold",
  titleMeta: "text-xs text-muted-foreground",
  closeButton:
    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md !p-0 hover:bg-muted",
  alert: ({ hasError }: TAlertStateParams) =>
    cn(
      "border-b px-5 py-2 text-xs",
      hasError
        ? "border-danger/30 bg-danger/10 text-danger"
        : "border-warning/30 bg-warning/10 text-warning"
    ),
  body: "flex-1 overflow-y-auto px-5 py-4",
  list: "divide-y divide-border",
  listItem: "flex gap-4 py-4",
  imageWrap:
    "relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-border bg-muted",
  image: "object-cover",
  itemInfo: "flex min-w-0 flex-1 flex-col",
  itemTopRow: "flex items-start justify-between gap-3",
  itemLink: "line-clamp-2 text-sm font-medium hover:underline",
  removeButton:
    "!p-0 text-muted-foreground hover:bg-transparent hover:text-danger disabled:opacity-50",
  lineTotal: "text-sm font-semibold",
  subtotalLabel: "text-muted-foreground",
  subtotalValue: "text-base font-semibold",
  footer:
    "border-t border-border px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]",
  itemPrice: "mt-0.5 text-xs text-muted-foreground",
  subtotalRow: "flex items-center justify-between text-sm",
  itemBottomRow: "mt-auto flex items-center justify-between pt-3",
} as const;
