"use client";

import { useEffect } from "react";

type TUseBodyScrollLockParams = {
  isLocked: boolean;
};

export const useBodyScrollLock = ({ isLocked }: TUseBodyScrollLockParams) => {
  useEffect(() => {
    if (!isLocked) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isLocked]);
};
