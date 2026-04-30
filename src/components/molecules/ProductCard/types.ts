import type { TProductSchema } from "@/lib/schemas";

export type TProductCardProps = Partial<{
  priority: boolean;
  showFeaturedBadge: boolean;
}> & {
  product: TProductSchema;
};
