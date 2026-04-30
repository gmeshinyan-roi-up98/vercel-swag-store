import type { TPaginationSchema } from "@/lib/schemas";

export type TPendingPaginationNav =
  | { type: "page"; href: string }
  | { type: "prev" }
  | { type: "next" };

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
