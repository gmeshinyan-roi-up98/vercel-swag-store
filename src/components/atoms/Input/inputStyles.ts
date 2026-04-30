import { INPUT_CONSTANTS } from "./input.const";

export const classes = {
  variant: {
    [INPUT_CONSTANTS.VARIANTS.DEFAULT]: "input",
    [INPUT_CONSTANTS.VARIANTS.QUANTITY]:
      "h-10 w-16 max-w-full border-x border-border bg-transparent text-center text-base tabular-nums focus:outline-none [appearance:textfield] sm:w-14 sm:text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    [INPUT_CONSTANTS.VARIANTS.SEARCH]: "input pl-9",
  },
} as const;
