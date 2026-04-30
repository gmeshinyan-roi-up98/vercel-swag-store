import type {
  TGetPaginationPageItemsParams,
  TGetPaginationPageAriaLabelParams,
} from "./types";

export const getPaginationPageItems = ({
  currentPage,
  totalPages,
}: TGetPaginationPageItemsParams): Array<number | "ellipsis"> => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: Array<number | "ellipsis"> = [1];
  const windowStart = Math.max(2, currentPage - 1);
  const windowEnd = Math.min(totalPages - 1, currentPage + 1);

  if (windowStart > 2) items.push("ellipsis");

  for (let p = windowStart; p <= windowEnd; p += 1) items.push(p);
  if (windowEnd < totalPages - 1) items.push("ellipsis");
  if (totalPages > 1) items.push(totalPages);

  return items;
};

export const getPaginationPageAriaLabel = ({
  page,
}: TGetPaginationPageAriaLabelParams) => `Page ${page}`;
