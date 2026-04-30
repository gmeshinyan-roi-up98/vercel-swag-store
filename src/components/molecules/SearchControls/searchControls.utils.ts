import { buildSearchPath } from "@/lib/searchUrl";

import type { TBuildSearchHrefParams } from "./types";

export const buildSearchHref = ({
  query,
  category,
}: TBuildSearchHrefParams) => buildSearchPath({ query, category, page: 1 });
