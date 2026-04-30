import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";

const HOME_OPEN_GRAPH = {
  TITLE: "Vercel Swag",
  DESCRIPTION:
    "Premium developer apparel and accessories from Vercel. Discover our latest tees, hoodies, and gear.",
} as const;

export const homeMetadata: Metadata = {
  title: HOME_OPEN_GRAPH.TITLE,
  description: HOME_OPEN_GRAPH.DESCRIPTION,
  openGraph: {
    title: HOME_OPEN_GRAPH.TITLE,
    description: HOME_OPEN_GRAPH.DESCRIPTION,
    url: "/",
    images: [
      {
        url: siteConfig.ogImage,
        width: siteConfig.ogImageWidth,
        height: siteConfig.ogImageHeight,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_OPEN_GRAPH.TITLE,
    description: HOME_OPEN_GRAPH.DESCRIPTION,
    images: [siteConfig.ogImage],
  },
};
