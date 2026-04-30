import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { APP_STATE } from "./constants/appState";
import { ROUTES } from "./constants/routes";

const isMaintenanceModeEnabled = (): boolean => {
  const appMode = process.env.APP_STATE;

  if (appMode == null || appMode === "") return false;

  const normalized = appMode.trim().toLowerCase();

  return (
    normalized === APP_STATE.MAINTENANCE || normalized === APP_STATE.PRODUCTION
  );
};

export const proxy = (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const isInMaintenanceMode = isMaintenanceModeEnabled();

  if (!isInMaintenanceMode) {
    if (pathname.startsWith(ROUTES.MAINTENANCE)) {
      return NextResponse.redirect(new URL(ROUTES.HOME, req.url));
    }

    return NextResponse.next();
  }

  if (
    pathname.startsWith(ROUTES.MAINTENANCE) ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(ROUTES.MAINTENANCE, req.url));
};

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
