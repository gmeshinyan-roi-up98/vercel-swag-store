import Link from "next/link";

import { ROUTES } from "@/constants";
import { SearchIcon, VercelMark } from "@/components/icons";
import { CartButton } from "@/components/molecules/CartButton";

import { HeaderPrimaryNav } from "./HeaderPrimaryNav";
import { HEADER_CONSTANTS } from "./header.const";
import { classes } from "./headerStyles";

export const Header = () => (
  <header className={classes.root}>
    <div className={classes.inner}>
      <Link
        href={ROUTES.HOME}
        className={classes.brandLink}
        aria-label={HEADER_CONSTANTS.BRAND_HOME_ARIA}
      >
        <VercelMark className="h-6 w-6" />
      </Link>

      <HeaderPrimaryNav />

      <div className={classes.actions}>
        <Link
          href={ROUTES.SEARCH}
          aria-label={HEADER_CONSTANTS.SEARCH_MOBILE_ARIA}
          className={classes.searchIconLink}
        >
          <SearchIcon />
        </Link>
        <CartButton />
      </div>
    </div>
  </header>
);
