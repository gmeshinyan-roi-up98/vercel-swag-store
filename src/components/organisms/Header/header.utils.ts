import { ROUTES } from "@/constants";

import type { THrefActiveParams } from "./header.types";

export const isHeaderNavHrefActive = ({
  href,
  pathname,
}: THrefActiveParams) => {
  if (href === ROUTES.HOME) {
    return pathname === ROUTES.HOME;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};
