import "server-only";

import { env } from "@/lib/env";

export const getSiteOrigin = (): string =>
  env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
