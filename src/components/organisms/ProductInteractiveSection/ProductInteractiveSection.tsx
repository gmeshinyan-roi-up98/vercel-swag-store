import { StockHydrator } from "@/providers";
import { type TStockSchema, cn } from "@/lib";
import { getProductStock } from "@/lib/api/stock";
import { AddToCartForm } from "@/components/molecules/AddToCartForm";
import { StockDisplay } from "@/components/molecules/StockDisplay";

import { classes } from "./productInteractiveSectionStyles";
import type { TProductInteractiveSectionProps } from "./types";

export const ProductInteractiveSection = async ({
  className,
  productId,
  productSlug,
}: TProductInteractiveSectionProps) => {
  const stock: TStockSchema | null = await getProductStock(productSlug);

  return (
    <div className={cn(classes.root, className)}>
      <StockHydrator productId={productId} stock={stock} />

      <div className={classes.stockWrap}>
        <StockDisplay productId={productId} initialStock={stock} />
      </div>

      <div className={classes.formWrap}>
        <AddToCartForm productId={productId} initialStock={stock} />
      </div>
    </div>
  );
};
