"use client";

import Link from "next/link";

import { cn, buildSearchPath } from "@/lib";
import { NextNavIcon, PreviousNavIcon } from "@/components/icons";

import { useSearchPagination } from "./pagination.hooks";
import { classes } from "./paginationStyles";
import type { TPaginationProps } from "./types";
import { PAGINATION_CONSTANTS } from "./pagination.const";
import {
  getPaginationPageItems,
  getPaginationPageAriaLabel,
} from "./pagination.utils";

export const Pagination = ({
  query,
  category,
  className,
  pagination,
}: TPaginationProps) => {
  const { isPending, pendingHref, handlePaginationLinkClick } =
    useSearchPagination();
  const {
    totalPages,
    hasNextPage,
    hasPreviousPage,
    page: currentPage,
  } = pagination;

  if (totalPages <= 1) return null;

  const pageItems = getPaginationPageItems({ currentPage, totalPages });

  const prevHref = buildSearchPath({
    query,
    category,
    page: currentPage - 1,
  });
  const nextHref = buildSearchPath({
    query,
    category,
    page: currentPage + 1,
  });

  return (
    <nav
      aria-label={PAGINATION_CONSTANTS.NAV_ARIA_LABEL}
      aria-busy={isPending}
      className={cn(classes.nav, className)}
    >
      <div
        className={cn(
          classes.cluster,
          isPending ? classes.clusterPending : undefined,
        )}
      >
        {hasPreviousPage ? (
          <Link
            prefetch
            className={cn(
              classes.navArrowInteractive,
              pendingHref === prevHref && classes.controlPendingTarget,
              isPending && pendingHref !== prevHref && classes.controlDimmed,
            )}
            aria-label={PAGINATION_CONSTANTS.PREVIOUS_ARIA}
            href={prevHref}
            onClick={handlePaginationLinkClick}
          >
            <PreviousNavIcon className={classes.navIcon} />
          </Link>
        ) : (
          <span className={classes.navArrowDisabled} aria-hidden>
            <PreviousNavIcon className={classes.navIcon} />
          </span>
        )}

        <ul className={classes.pageList}>
          {pageItems.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <li
                  key={`e-${index}`}
                  className={classes.ellipsis}
                  aria-hidden
                >
                  {PAGINATION_CONSTANTS.ELLIPSIS_CHARACTER}
                </li>
              );
            }

            const pageHref = buildSearchPath({
              query,
              category,
              page: item,
            });
            const isPendingTarget = pendingHref === pageHref;
            const showCurrentHighlight = item === currentPage && !isPending;

            return (
              <li key={item}>
                <Link
                  href={pageHref}
                  prefetch
                  aria-label={getPaginationPageAriaLabel({ page: item })}
                  aria-current={item === currentPage ? "page" : undefined}
                  className={cn(
                    classes.pageLink,
                    isPending && isPendingTarget
                      ? classes.controlPendingTarget
                      : showCurrentHighlight
                        ? classes.pageLinkActive
                        : classes.pageLinkIdle,
                    isPending &&
                      !isPendingTarget &&
                      classes.controlDimmed,
                  )}
                  onClick={
                    item === currentPage
                      ? undefined
                      : handlePaginationLinkClick
                  }
                >
                  {item}
                </Link>
              </li>
            );
          })}
        </ul>

        {hasNextPage ? (
          <Link
            prefetch
            className={cn(
              classes.navArrowInteractive,
              pendingHref === nextHref && classes.controlPendingTarget,
              isPending && pendingHref !== nextHref && classes.controlDimmed,
            )}
            aria-label={PAGINATION_CONSTANTS.NEXT_ARIA}
            href={nextHref}
            onClick={handlePaginationLinkClick}
          >
            <NextNavIcon className={classes.navIcon} />
          </Link>
        ) : (
          <span className={classes.navArrowDisabled} aria-hidden>
            <NextNavIcon className={classes.navIcon} />
          </span>
        )}
      </div>
    </nav>
  );
};
