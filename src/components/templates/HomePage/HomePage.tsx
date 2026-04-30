import { Suspense } from "react";

import {
  HomeHero,
  HomePromotionBanner,
  HomeFeaturedSection,
  PromotionBannerSkeleton,
} from "@/components/organisms";
import { getFeaturedProducts } from "@/lib/api/products";

export const HomePageTemplate = async () => {
  const products = await getFeaturedProducts(8);

  const heroSource = products[0];
  const heroImageSrc = heroSource?.images[0];

  return (
    <>
      <HomeHero
        heroImageSrc={heroImageSrc}
        heroImageAlt={heroSource?.name ?? "Hero Image"}
      />
      <Suspense fallback={<PromotionBannerSkeleton />}>
        <HomePromotionBanner />
      </Suspense>
      <HomeFeaturedSection products={products} />
    </>
  );
};
