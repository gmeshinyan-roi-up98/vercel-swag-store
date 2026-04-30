"use client";

import {
  useRef,
  useState,
  useEffect,
  useTransition,
  startTransition,
  type ChangeEvent,
  type SyntheticEvent,
} from "react";

import { useRouter } from "next/navigation";

import { buildSearchHref } from "./searchControls.utils";
import { SEARCH_CONTROLS_CONSTANTS } from "./searchControls.const";
import type { TSearchControlsProps, TReplaceSearchRouteParams } from "./types";

export const useSearchControls = ({
  initialQuery,
  initialCategory,
}: Pick<TSearchControlsProps, "initialCategory" | "initialQuery">) => {
  const router = useRouter();
  const [isPending, startNavigationTransition] = useTransition();

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const lastReplacedSearchParams = useRef({
    query: initialQuery,
    category: initialCategory,
  });

  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    startTransition(() => {
      setQuery(initialQuery);
      setCategory(initialCategory);
    });

    lastReplacedSearchParams.current = {
      query: initialQuery,
      category: initialCategory,
    };
  }, [initialCategory, initialQuery]);

  const replaceSearchRoute = ({
    nextQuery,
    nextCategory,
  }: TReplaceSearchRouteParams) => {
    if (
      lastReplacedSearchParams.current.query === nextQuery &&
      lastReplacedSearchParams.current.category === nextCategory
    ) {
      return;
    }
    lastReplacedSearchParams.current = {
      query: nextQuery,
      category: nextCategory,
    };

    startNavigationTransition(() => {
      router.replace(
        buildSearchHref({ query: nextQuery, category: nextCategory }),
        {
          scroll: false,
        }
      );
    });
  };

  useEffect(() => {
    if (debounceTimer.current) {
      window.clearTimeout(debounceTimer.current);
    }
    const trimmed = query.trim();
    if (
      trimmed.length === 0 ||
      trimmed.length >= SEARCH_CONTROLS_CONSTANTS.MIN_AUTO_SEARCH
    ) {
      debounceTimer.current = window.setTimeout(() => {
        replaceSearchRoute({ nextQuery: trimmed, nextCategory: category });
      }, SEARCH_CONTROLS_CONSTANTS.DEBOUNCE_MS);
    }
    return () => {
      if (debounceTimer.current) window.clearTimeout(debounceTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, query]);

  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    replaceSearchRoute({ nextQuery: query.trim(), nextCategory: category });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value;
    setCategory(next);

    startTransition(() => {
      replaceSearchRoute({ nextQuery: query.trim(), nextCategory: next });
    });
  };

  const handleClearFilters = () => {
    setQuery("");
    setCategory("");
    replaceSearchRoute({ nextQuery: "", nextCategory: "" });
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const hasActiveFilters = query.trim().length > 0 || category.length > 0;

  return {
    query,
    category,
    isPending,
    handleSubmit,
    hasActiveFilters,
    handleQueryChange,
    handleClearFilters,
    handleCategoryChange,
  };
};
