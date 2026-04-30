export const classes = {
  clearFilters: "mt-2",
  inputWrap: "relative",
  searchColumn: "flex-1",
  categorySelect: "cursor-pointer sm:w-56",
  form: "flex flex-col gap-3 sm:flex-row sm:items-start",
  searchIcon:
    "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
  spinnerWrap: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2",
  spinner:
    "block h-4 w-4 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground",
} as const;
