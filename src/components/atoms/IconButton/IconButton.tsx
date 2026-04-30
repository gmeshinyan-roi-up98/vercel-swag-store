import { forwardRef } from "react";

import { cn } from "@/lib";

import { classes } from "./iconButtonStyles";
import type { TIconButtonProps } from "./types";

export const IconButton = forwardRef<HTMLButtonElement, TIconButtonProps>(
  ({ className, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(classes.root, className)}
      {...rest}
    />
  )
);

IconButton.displayName = "IconButton";
