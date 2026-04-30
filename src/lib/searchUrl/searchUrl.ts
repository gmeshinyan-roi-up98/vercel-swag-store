import type { Route } from "next";

import type { TBuildSearchPathParams } from "./types";
import { SEARCH_URL_CONSTANTS } from "./searchUrl.const";

export const buildSearchPath = ({
  query,
  category,
  page = 1,
}: TBuildSearchPathParams): Route => {
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (category) params.set("category", category);
  if (page > SEARCH_URL_CONSTANTS.DEFAULT_PAGE)
    params.set("page", String(page));

  const qs = params.toString();

  return (
    qs
      ? `${SEARCH_URL_CONSTANTS.SEARCH_PATH}?${qs}`
      : SEARCH_URL_CONSTANTS.SEARCH_PATH
  ) as Route;
};
