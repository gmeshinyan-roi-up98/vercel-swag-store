import "server-only";

import type { Metadata } from "next";

import { getProduct } from "@/lib/api/products";
import { formatCategory } from "@/lib/format";
import { siteConfig } from "@/lib/site-config";

export const PRODUCT_DETAIL_METADATA_CONSTANTS = {
  PRODUCT_NOT_FOUND_DESCRIPTION:
    "This product could not be found. Browse the full Vercel Swag Store catalog.",
} as const;

type TGetProductMetaDescriptionParams = {
  description: string;
  name: string;
  category: string;
};

const getProductMetaDescription = ({
  description,
  name,
  category,
}: TGetProductMetaDescriptionParams): string => {
  const normalized = description.trim().replace(/\s+/g, " ");
  if (normalized.length > 0) {
    return normalized.slice(0, 160);
  }

  return `Shop ${name} from our ${formatCategory(category)} collection at ${
    siteConfig.name
  }.`;
};

type TGenerateProductDetailPageMetadataProps = {
  params: Promise<{ param: string }>;
};

export const generateProductDetailPageMetadata = async ({
  params,
}: TGenerateProductDetailPageMetadataProps): Promise<Metadata> => {
  const { param } = await params;

  try {
    const product = await getProduct(param);
    if (!product) {
      return {
        title: "Product not found",
        description:
          PRODUCT_DETAIL_METADATA_CONSTANTS.PRODUCT_NOT_FOUND_DESCRIPTION,
      };
    }

    const title = product.name;
    const description = getProductMetaDescription({
      description: product.description,
      name: product.name,
      category: product.category,
    });
    const productImage = product.images[0];
    const image = productImage ?? siteConfig.ogImage;
    const imageWidth = productImage ? 1200 : siteConfig.ogImageWidth;
    const imageHeight = productImage ? 1200 : siteConfig.ogImageHeight;
    return {
      title,
      description,
      alternates: { canonical: `/products/${product.slug}` },
      openGraph: {
        type: "website",
        title,
        description,
        url: `/products/${product.slug}`,
        images: [
          { url: image, width: imageWidth, height: imageHeight, alt: product.name },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {
      title: "Product details",
      description: siteConfig.description,
    };
  }
};
