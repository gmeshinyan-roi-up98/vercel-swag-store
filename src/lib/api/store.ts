import "server-only";

import { apiRequest } from "@/lib/api/client";
import { CACHE_TAGS } from "@/lib/cache-tags";
import {
  storeConfigResponseSchema,
  type TStoreConfigResponse,
} from "@/lib/schemas";

type TGetStoreConfigResult = TStoreConfigResponse | { success: false };

export const getStoreConfig = async (): Promise<TGetStoreConfigResult> => {
  try {
    return await apiRequest({
      path: "/store/config",
      schema: storeConfigResponseSchema,
      init: {
        next: {
          revalidate: 3600,
          tags: [CACHE_TAGS.storeConfig],
        },
      },
    });
  } catch {
    return { success: false };
  }
};
