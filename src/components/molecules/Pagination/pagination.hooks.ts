"use client";

import type { Route } from "next";
import { useState, useTransition, type MouseEvent } from "react";
import { useRouter } from "next/navigation";

import type { TPendingPaginationNav } from "./types";

type TUseSearchPaginationReturn = {
  isPending: boolean;
  pendingNavigation: TPendingPaginationNav | null;
  handlePaginationNav: (
    event: MouseEvent<HTMLAnchorElement>,
    source: TPendingPaginationNav["type"],
  ) => void;
};

export const useSearchPagination = (): TUseSearchPaginationReturn => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingNavigationRaw, setPendingNavigationRaw] =
    useState<TPendingPaginationNav | null>(null);

  const handlePaginationNav = (
    event: MouseEvent<HTMLAnchorElement>,
    source: TPendingPaginationNav["type"],
  ) => {
    event.preventDefault();
    if (isPending) {
      return;
    }
    const path = event.currentTarget.getAttribute("href");
    if (!path) {
      return;
    }
    setPendingNavigationRaw(
      source === "page" ? { type: "page", href: path } : { type: source },
    );
    startTransition(() => {
      router.push(path as Route);
    });
  };

  return {
    isPending,
    pendingNavigation: isPending ? pendingNavigationRaw : null,
    handlePaginationNav,
  };
};
