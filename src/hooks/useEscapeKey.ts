"use client";

import { useEffect } from "react";

type TUseEscapeKeyParams = {
  isActive: boolean;
  onEscape: VoidFunction;
};

export const useEscapeKey = ({ isActive, onEscape }: TUseEscapeKeyParams) => {
  useEffect(() => {
    if (!isActive) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, [isActive, onEscape]);
};
