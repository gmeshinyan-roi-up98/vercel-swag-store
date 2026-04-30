"use client";

import type { Route } from "next";
import { useState, useTransition, type MouseEvent } from "react";
import { useRouter } from "next/navigation";

type TUseSearchPaginationReturn = {
  isPending: boolean;
  pendingHref: string | null;
  handlePaginationLinkClick: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export const useSearchPagination = (): TUseSearchPaginationReturn => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const handlePaginationLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    if (isPending) {
      return;
    }
    const path = event.currentTarget.getAttribute("href");
    if (!path) {
      return;
    }
    setPendingHref(path);
    startTransition(() => {
      router.push(path as Route);
    });
  };

  return {
    isPending,
    pendingHref: isPending ? pendingHref : null,
    handlePaginationLinkClick,
  };
};
