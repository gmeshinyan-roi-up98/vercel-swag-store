import { Suspense } from "react";
import { notFound } from "next/navigation";

import {
  ProductDetailTemplate,
  ProductInteractiveSection,
  ProductStockSectionSkeleton,
} from "@/components";
import { fetchAllProductsForSitemap, getProduct } from "@/lib/api/products";
import { generateProductDetailPageMetadata } from "@/lib/metadata/product-detail-metadata";

type RouteParams = { param: string };

export const generateStaticParams = async (): Promise<{ param: string }[]> => {
  const entries = await fetchAllProductsForSitemap();

  return entries.map(({ slug }) => ({ param: slug }));
};

export const generateMetadata = generateProductDetailPageMetadata;

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<RouteParams>;
}) => {
  const { param } = await params;
  const product = await getProduct(param);

  if (!product) notFound();

  return (
    <ProductDetailTemplate
      product={product}
      interactiveSlot={
        <Suspense fallback={<ProductStockSectionSkeleton />}>
          <ProductInteractiveSection
            productId={product.id}
            productSlug={product.slug}
          />
        </Suspense>
      }
    />
  );
};

export default ProductDetailPage;
