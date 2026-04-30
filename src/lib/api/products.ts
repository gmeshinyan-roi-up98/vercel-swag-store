import "server-only";

import { cacheLife, cacheTag } from "next/cache";

import { CACHE_TAGS } from "@/lib/cache-tags";
import {
  productListResponseSchema,
  productResponseSchema,
  type TPaginationSchema,
  type TProductSchema,
} from "@/lib/schemas";

import { apiRequest } from "./client";

type ListProductsParams = Partial<{
  page: number;
  limit: number;
  search: string;
  category: string;
  featured: boolean;
}>;

export const listProducts = async (
  params: ListProductsParams = {}
): Promise<{ products: TProductSchema[]; pagination?: TPaginationSchema }> => {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products);

  const result = await apiRequest({
    path: "/products",
    schema: productListResponseSchema,
    searchParams: {
      page: params.page,
      limit: params.limit,
      category: params.category,
      search: params.search,
      featured:
        params.featured === undefined
          ? undefined
          : params.featured
          ? "true"
          : "false",
    },
  });

  return { products: result.data, pagination: result.meta?.pagination };
};

export const getFeaturedProducts = async (
  limit = 6
): Promise<TProductSchema[]> => {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products);

  const result = await apiRequest({
    path: "/products",
    schema: productListResponseSchema,
    searchParams: { featured: "true", limit },
  });

  return result.data;
};

export const getProduct = async (
  idOrSlug: string
): Promise<TProductSchema | null> => {
  "use cache";
  cacheLife("hours");
  cacheTag(CACHE_TAGS.products, CACHE_TAGS.product(idOrSlug));

  try {
    const result = await apiRequest({
      path: `/products/${encodeURIComponent(idOrSlug)}`,
      schema: productResponseSchema,
    });
    return result.data;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "status" in error &&
      (error as { status: number }).status === 404
    ) {
      return null;
    }
    throw error;
  }
};

export const SEARCH_PAGE_SIZE = 20;

const SITEMAP_PRODUCT_FETCH_PAGE_LIMIT = 100;

export type TSitemapProductEntry = {
  slug: string;
  lastModified: Date;
};

export const fetchAllProductsForSitemap = async (): Promise<
  TSitemapProductEntry[]
> => {
  const entries: TSitemapProductEntry[] = [];
  let page = 1;

  while (page <= SITEMAP_PRODUCT_FETCH_PAGE_LIMIT) {
    const { products, pagination } = await listProducts({
      page,
      limit: 100,
    });

    for (const product of products) {
      entries.push({
        slug: product.slug,
        lastModified: new Date(product.createdAt),
      });
    }

    if (!pagination?.hasNextPage) {
      break;
    }

    page += 1;
  }

  return entries;
};

type TSearchProductsParams = {
  query: string;
  category: string;
  page?: number;
  limit?: number;
};

export const searchProducts = async ({
  query,
  category,
  page = 1,
  limit = SEARCH_PAGE_SIZE,
}: TSearchProductsParams): Promise<{
  products: TProductSchema[];
  pagination: TPaginationSchema | undefined;
}> => {
  "use cache";
  cacheLife("minutes");
  cacheTag(CACHE_TAGS.products);

  const { data, meta } = await apiRequest({
    path: "/products",
    schema: productListResponseSchema,
    searchParams: {
      search: query || undefined,
      category: category || undefined,
      page,
      limit,
    },
  });

  return { products: data, pagination: meta?.pagination };
};
