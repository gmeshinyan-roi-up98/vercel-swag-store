"use client";

import Link from "next/link";
import { useCallback, type MouseEvent } from "react";

import { PAGE_SECTION_IDS, ROUTES } from "@/constants";

import { HOME_HERO_CONSTANTS } from "./homeHero.const";
import type { THomeHeroFeaturedNavLinkProps } from "./types";

export const HomeHeroFeaturedNavLink = ({
  className,
}: THomeHeroFeaturedNavLinkProps) => {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (window.location.pathname !== ROUTES.HOME) {
        return;
      }

      event.preventDefault();
      const featured = document.getElementById(PAGE_SECTION_IDS.HOME_FEATURED);
      featured?.scrollIntoView({ behavior: "smooth", block: "start" });

      const nextHash = `#${PAGE_SECTION_IDS.HOME_FEATURED}`;
      const nextHref = `${ROUTES.HOME}${nextHash}`;
      if (`${window.location.pathname}${window.location.search}${window.location.hash}` !== nextHref) {
        window.history.pushState(null, "", nextHref);
      }
    },
    []
  );

  return (
    <Link
      className={className}
      href={`${ROUTES.HOME}#${PAGE_SECTION_IDS.HOME_FEATURED}`}
      onClick={handleClick}
    >
      {HOME_HERO_CONSTANTS.FEATURED_PRODUCTS_LINK}
    </Link>
  );
};
