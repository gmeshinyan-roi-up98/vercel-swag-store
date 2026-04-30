import type { MetadataRoute } from "next";

import { ROUTES } from "../constants/routes";
import { getSiteOrigin } from "@/lib/site-url";

const robots = (): MetadataRoute.Robots => {
  const origin = getSiteOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [ROUTES.MAINTENANCE],
      },
    ],
    host: origin,
    sitemap: `${origin}/sitemap.xml`,
  };
};

export default robots;
