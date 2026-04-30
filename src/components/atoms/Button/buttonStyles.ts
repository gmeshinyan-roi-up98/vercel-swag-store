import { BUTTON_CONSTANTS } from "./button.const";

export const classes = {
  variant: {
    [BUTTON_CONSTANTS.VARIANTS.PRIMARY]: "btn-primary",
    [BUTTON_CONSTANTS.VARIANTS.SECONDARY]: "btn-secondary",
    [BUTTON_CONSTANTS.VARIANTS.GHOST]: "btn-ghost",
    [BUTTON_CONSTANTS.VARIANTS.LINK]:
      "text-left text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline disabled:cursor-not-allowed disabled:no-underline disabled:opacity-40",
  },
} as const;
