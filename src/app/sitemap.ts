import type { MetadataRoute } from "next";

import { ROUTES } from "../constants/routes";
import { fetchAllProductsForSitemap } from "@/lib/api/products";
import { getSiteOrigin } from "@/lib/site-url";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const origin = getSiteOrigin();
  const products = await fetchAllProductsForSitemap();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${origin}${ROUTES.HOME}`,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${origin}${ROUTES.SEARCH}`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const productEntries: MetadataRoute.Sitemap = products.map(
    ({ slug, lastModified }) => ({
      url: `${origin}/products/${encodeURIComponent(slug)}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })
  );

  return [...staticEntries, ...productEntries];
};

export default sitemap;
