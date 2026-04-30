import { Suspense } from "react";

import type { Metadata } from "next";

import {
  SearchPageTemplate,
  ProductGridSkeleton,
  SearchResultsSection,
} from "@/components";
import { ROUTES } from "@/constants";
import { searchParamsSchema, siteConfig } from "@/lib";
import { SEARCH_RESULTS_SECTION_CONSTANTS } from "@/components/organisms/SearchResultsSection/searchResultsSection.const";
import { listCategories } from "@/lib/api/categories";
import { SEARCH_PAGE_SIZE } from "@/lib/api/products";

export const metadata: Metadata = {
  title: "Search",
  description: "Search the Vercel swag catalog by name, category, and tags.",
  alternates: { canonical: ROUTES.SEARCH },
  openGraph: {
    title: "Search the Vercel Swag Store",
    description: "Search the Vercel swag catalog by name, category, and tags.",
    url: ROUTES.SEARCH,
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.name,
      },
    ],
  },
};

type RawSearchParams = Record<string, string | string[] | undefined>;

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) => {
  const raw = await searchParams;

  const parsed = searchParamsSchema.parse({
    query: typeof raw.query === "string" ? raw.query : "",
    category: typeof raw.category === "string" ? raw.category : "",
    page: typeof raw.page === "string" ? raw.page : undefined,
  });

  const categories = await listCategories();

  const hasSearchFilter =
    parsed.query.length > 0 || parsed.category.length > 0;
  const resultsSkeletonCount = hasSearchFilter
    ? SEARCH_RESULTS_SECTION_CONSTANTS.FILTERED_SEARCH_PAGE_SIZE
    : SEARCH_PAGE_SIZE;

  return (
    <SearchPageTemplate
      initialQuery={parsed.query}
      initialCategory={parsed.category}
      categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
      results={
        <Suspense
          key={`${parsed.query}::${parsed.category}::${
            hasSearchFilter ? 1 : parsed.page
          }`}
          fallback={<ProductGridSkeleton count={resultsSkeletonCount} />}
        >
          <SearchResultsSection
            query={parsed.query}
            page={parsed.page}
            category={parsed.category}
          />
        </Suspense>
      }
    />
  );
};

export default SearchPage;
