"use client";

import type { Route } from "next";
import { useCallback, useTransition, type MouseEvent } from "react";
import { useRouter } from "next/navigation";

type TUseSearchPaginationReturn = {
  isPending: boolean;
  handlePaginationLinkClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const useSearchPagination = (): TUseSearchPaginationReturn => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handlePaginationLinkClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      if (isPending) {
        return;
      }
      const path = event.currentTarget.getAttribute("href");
      if (!path) {
        return;
      }
      startTransition(() => {
        router.push(path as Route);
      });
    },
    [isPending, router],
  );

  return { isPending, handlePaginationLinkClick };
};
