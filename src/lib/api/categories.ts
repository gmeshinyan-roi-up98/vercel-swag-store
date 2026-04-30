import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-tags";
import {
  categoryListResponseSchema,
  type TCategorySchema,
} from "@/lib/schemas";

import { apiRequest } from "./client";

export const listCategories = async (): Promise<TCategorySchema[]> => {
  "use cache";
  cacheLife("days");
  cacheTag(CACHE_TAGS.categories);

  const { data } = await apiRequest({
    path: "/categories",
    schema: categoryListResponseSchema,
  });

  return data;
};
