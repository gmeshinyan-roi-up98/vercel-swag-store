import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TIconButtonProps = Partial<{
  className: string;
  children: ReactNode;
}> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "type">;
