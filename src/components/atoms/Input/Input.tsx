import { forwardRef } from "react";

import { cn } from "@/lib";

import { INPUT_CONSTANTS } from "./input.const";
import { classes } from "./inputStyles";
import type { TInputProps } from "./types";

export const Input = forwardRef<HTMLInputElement, TInputProps>(
  ({ className, variant, ...rest }, ref) => {
    const resolvedVariant =
      variant ?? INPUT_CONSTANTS.DEFAULT_VARIANT;

    return (
      <input
        ref={ref}
        className={cn(classes.variant[resolvedVariant], className)}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";
