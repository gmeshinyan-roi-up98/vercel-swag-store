import type { TProductSchema } from "@/lib/schemas";

export type TProductGridProps = Partial<{
  prioritizeFirst: boolean;
  showFeaturedBadge: boolean;
}> & {
  products: TProductSchema[];
};

export type TProductGridSkeletonProps = Partial<{
  count: number;
}>;
