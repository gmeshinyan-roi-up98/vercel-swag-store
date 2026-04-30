"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/constants";
import { cn } from "@/lib";

import { HEADER_CONSTANTS } from "./header.const";
import { classes } from "./headerStyles";
import { isHeaderNavHrefActive } from "./header.utils";

const HEADER_NAV_ITEMS = [
  { href: ROUTES.HOME, label: HEADER_CONSTANTS.NAV_HOME },
  { href: ROUTES.SEARCH, label: HEADER_CONSTANTS.NAV_SEARCH },
] as const;

export const HeaderPrimaryNav = () => {
  const pathname = usePathname() ?? "";

  return (
    <nav
      aria-label={HEADER_CONSTANTS.NAV_PRIMARY_LABEL}
      className={classes.nav}
    >
      <ul className={classes.navList}>
        {HEADER_NAV_ITEMS.map(({ href, label }) => {
          const isActive = isHeaderNavHrefActive({ pathname, href });

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  classes.navLink,
                  isActive ? classes.navLinkActive : classes.navLinkIdle
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
