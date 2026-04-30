"use client";

import {
  Button,
  Input,
  Select,
  BUTTON_CONSTANTS,
  INPUT_CONSTANTS,
} from "@/components/atoms";
import { cn } from "@/lib";
import { SearchIcon } from "@/components/icons";

import { classes } from "./searchControlsStyles";
import type { TSearchControlsProps } from "./types";
import { useSearchControls } from "./searchControls.hooks";
import { SEARCH_CONTROLS_CONSTANTS } from "./searchControls.const";

export const SearchControls = ({
  className,
  categories,
  initialQuery,
  initialCategory,
}: TSearchControlsProps) => {
  const {
    query,
    category,
    isPending,
    handleSubmit,
    hasActiveFilters,
    handleQueryChange,
    handleClearFilters,
    handleCategoryChange,
  } = useSearchControls({ initialCategory, initialQuery });

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(classes.form, className)}
      aria-busy={isPending}
    >
      <div className={classes.searchColumn}>
        <div className={classes.inputWrap}>
          <SearchIcon width={16} height={16} className={classes.searchIcon} />
          <Input
            type="search"
            value={query}
            inputMode="search"
            autoComplete="off"
            onChange={handleQueryChange}
            variant={INPUT_CONSTANTS.VARIANTS.SEARCH}
            placeholder={SEARCH_CONTROLS_CONSTANTS.PLACEHOLDER}
            aria-label={SEARCH_CONTROLS_CONSTANTS.SEARCH_PRODUCTS_ARIA}
          />
          {isPending && (
            <span className={classes.spinnerWrap} aria-hidden>
              <span className={classes.spinner} />
            </span>
          )}
        </div>
        <Button
          type="button"
          variant={BUTTON_CONSTANTS.VARIANTS.LINK}
          onClick={handleClearFilters}
          disabled={!hasActiveFilters}
          className={classes.clearFilters}
        >
          {SEARCH_CONTROLS_CONSTANTS.CLEAR_FILTERS_LABEL}
        </Button>
      </div>

      <label
        className="sr-only"
        htmlFor={SEARCH_CONTROLS_CONSTANTS.CATEGORY_SELECT_ID}
      >
        {SEARCH_CONTROLS_CONSTANTS.CATEGORY_LABEL}
      </label>
      <Select
        id={SEARCH_CONTROLS_CONSTANTS.CATEGORY_SELECT_ID}
        value={category}
        onChange={handleCategoryChange}
        className={classes.categorySelect}
      >
        <option value="">
          {SEARCH_CONTROLS_CONSTANTS.ALL_CATEGORIES_OPTION}
        </option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </Select>

      <Button type="submit" variant={BUTTON_CONSTANTS.VARIANTS.PRIMARY}>
        {SEARCH_CONTROLS_CONSTANTS.SEARCH_BUTTON_LABEL}
      </Button>
    </form>
  );
};
