import type { TCartItemSchema, TStockSchema } from "@/lib/schemas";

export type TCartDrawerProps = Partial<{
  className: string;
}>;

export type TAlertStateParams = {
  hasError: boolean;
};

export type TDrawerStateParams = {
  isOpen: boolean;
};

export type TCartStockLookup = (productId: string) => TStockSchema | undefined;

export type TFindMaxedCartLineItemParams = {
  items: TCartItemSchema[];
  getStock: TCartStockLookup;
};

export type TGetCanIncreaseByProductIdParams = TFindMaxedCartLineItemParams;

export type TGetCartMaxQuantityWarningParams = {
  suffix: string;
  maxedItem: TCartItemSchema | undefined;
};

export type TUseCartDrawerEffectsParams = {
  isOpen: boolean;
  close: VoidFunction;
  clearMessage: VoidFunction;
};
