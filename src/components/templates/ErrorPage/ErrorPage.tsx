"use client";

import { Button, BUTTON_CONSTANTS } from "@/components/atoms";

import { ERROR_PAGE_CONSTANTS } from "./errorPage.const";
import { classes } from "./errorPageStyles";
import type { TErrorPageTemplateProps } from "./types";
import { useEffect } from "react";

export const ErrorPageTemplate = ({
  error,
  reset,
}: TErrorPageTemplateProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={classes.root}>
      <h1 className={classes.title}>{ERROR_PAGE_CONSTANTS.TITLE}</h1>
      <p className={classes.description}>{ERROR_PAGE_CONSTANTS.DESCRIPTION}</p>
      <div className={classes.actions}>
        <Button
          type="button"
          onClick={reset}
          variant={BUTTON_CONSTANTS.VARIANTS.PRIMARY}
        >
          {ERROR_PAGE_CONSTANTS.TRY_AGAIN}
        </Button>
      </div>
    </section>
  );
};
