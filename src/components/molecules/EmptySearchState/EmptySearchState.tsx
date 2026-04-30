import { PackageSearchIcon } from "@/components/icons";
import { cn } from "@/lib";

import { EMPTY_SEARCH_STATE_CONSTANTS } from "./emptySearchState.const";
import { classes } from "./emptySearchStateStyles";
import type { TEmptySearchStateProps } from "./types";

export const EmptySearchState = ({
  className,
  title = EMPTY_SEARCH_STATE_CONSTANTS.TITLE,
  description = EMPTY_SEARCH_STATE_CONSTANTS.DESCRIPTION,
  footer,
}: TEmptySearchStateProps) => (
  <div className={cn(classes.root, className)}>
    <div className={classes.headerRow}>
      <PackageSearchIcon className={classes.icon} />
      <h2 className={classes.title}>{title}</h2>
    </div>
    <p className={classes.description}>{description}</p>
    {footer && <div className={classes.footer}>{footer}</div>}
  </div>
);
