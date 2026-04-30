import { cn } from "@/lib/cn";

import type { TIconProps } from "./types";

export const iconBaseProps = (props: TIconProps) => {
  const { className, ...rest } = props;
  return {
    width: 20,
    height: 20,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
    className: cn("shrink-0", className),
  };
};
