import type { ReactNode, SelectHTMLAttributes } from "react";

export type TSelectProps = Partial<{
  className: string;
  children: ReactNode;
}> &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, "className">;
