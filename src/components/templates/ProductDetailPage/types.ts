import type { TProductSchema } from "@/lib/schemas";

export type TProductDetailTemplateProps = Partial<{
  className: string;
  showFeaturedBadge: boolean;
}> & {
  product: TProductSchema;
  interactiveSlot: React.ReactNode;
};
