import type { InputHTMLAttributes } from "react";

import type { TValueOf } from "@/types";

import { INPUT_CONSTANTS } from "./input.const";

type TInputVariant = TValueOf<typeof INPUT_CONSTANTS.VARIANTS>;

export type TInputProps = Partial<{
  variant: TInputVariant;
  className: string;
}> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "className">;
