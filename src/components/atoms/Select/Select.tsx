import { forwardRef } from "react";

import { cn } from "@/lib";

import { classes } from "./selectStyles";
import type { TSelectProps } from "./types";

export const Select = forwardRef<HTMLSelectElement, TSelectProps>(
  ({ className, ...rest }, ref) => (
    <select ref={ref} className={cn(classes.root, className)} {...rest} />
  )
);

Select.displayName = "Select";
