import type { TPaginationSchema } from "@/lib/schemas";

export type TPaginationProps = Partial<{
  className: string;
}> & {
  query: string;
  category: string;
  pagination: TPaginationSchema;
};

export type TGetPaginationPageItemsParams = {
  totalPages: number;
  currentPage: number;
};

export type TGetPaginationPageAriaLabelParams = {
  page: number;
};
