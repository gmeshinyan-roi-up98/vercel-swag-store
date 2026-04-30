import type { ButtonHTMLAttributes, ReactNode } from "react";

import type { TValueOf } from "@/types";

import { BUTTON_CONSTANTS } from "./button.const";

type TButtonVariant = TValueOf<typeof BUTTON_CONSTANTS.VARIANTS>;

export type TButtonProps = Partial<{
  className: string;
  children: ReactNode;
  variant: TButtonVariant;
}> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;
