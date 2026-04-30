import type { Metadata } from "next";

import { env } from "@/lib/env";
import type { TStoreConfigData } from "@/lib/schemas";
import { siteConfig } from "@/lib/site-config";

const METADATA_CONSTANTS = {
  OPEN_GRAPH: {
    TYPE: "website",
    LOCALE: "en_US",
  },
  TWITTER: {
    CARD: "summary_large_image",
  },
} as const;

const ROOT_KEYWORDS = [
  "Vercel",
  "swag",
  "merchandise",
  "Next.js",
  "developer apparel",
  "t-shirt",
  "hoodie",
] as const;

export type TSiteBranding = {
  defaultTitle: string;
  siteName: string;
  description: string;
  titleTemplate: string;
};

export const getSiteBrandingFromStoreConfig = (
  config: TStoreConfigData | null | undefined
): TSiteBranding => {
  const storeName = config?.storeName ?? siteConfig.name;
  const seo = config?.seo;
  const defaultTitle = seo?.defaultTitle ?? storeName;
  const description =
    seo?.defaultDescription ?? siteConfig.description;
  const titleTemplate =
    seo?.titleTemplate ?? `%s | ${storeName}`;

  return {
    defaultTitle,
    siteName: storeName,
    description,
    titleTemplate,
  };
};

export const buildRootMetadata = (
  config: TStoreConfigData | null | undefined
): Metadata => {
  const { defaultTitle, siteName, description, titleTemplate } =
    getSiteBrandingFromStoreConfig(config);

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: {
      default: defaultTitle,
      template: titleTemplate,
    },
    description,
    applicationName: siteName,
    generator: siteConfig.generator,
    keywords: [...ROOT_KEYWORDS],
    alternates: { canonical: "/" },
    openGraph: {
      type: METADATA_CONSTANTS.OPEN_GRAPH.TYPE,
      locale: METADATA_CONSTANTS.OPEN_GRAPH.LOCALE,
      url: env.NEXT_PUBLIC_SITE_URL,
      siteName,
      title: defaultTitle,
      description,
      images: [
        {
          url: siteConfig.ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: METADATA_CONSTANTS.TWITTER.CARD,
      title: defaultTitle,
      description,
      images: [siteConfig.ogImage],
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    },
  };
};

export const rootMetadata = buildRootMetadata(null);
