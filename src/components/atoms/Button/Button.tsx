import { forwardRef } from "react";

import { cn } from "@/lib";

import { classes } from "./buttonStyles";
import type { TButtonProps } from "./types";
import { BUTTON_CONSTANTS } from "./button.const";

export const Button = forwardRef<HTMLButtonElement, TButtonProps>(
  ({ className, variant, type = "button", ...rest }, ref) => {
    const resolvedVariant = variant ?? BUTTON_CONSTANTS.DEFAULT_VARIANT;

    return (
      <button
        ref={ref}
        type={type}
        className={cn(classes.variant[resolvedVariant], className)}
        {...rest}
      />
    );
  }
);

Button.displayName = "Button";
