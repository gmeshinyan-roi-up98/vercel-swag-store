import Link from "next/link";

import { ROUTES } from "@/constants";

import { classes } from "./notFoundPageStyles";
import { NOT_FOUND_PAGE_CONSTANTS } from "./notFoundPage.const";

export const NotFoundPageTemplate = () => (
  <section className={classes.root}>
    <p className={classes.code}>{NOT_FOUND_PAGE_CONSTANTS.CODE}</p>
    <h1 className={classes.title}>{NOT_FOUND_PAGE_CONSTANTS.TITLE}</h1>
    <p className={classes.description}>
      {NOT_FOUND_PAGE_CONSTANTS.DESCRIPTION}
    </p>
    <Link href={ROUTES.HOME} className={classes.link}>
      {NOT_FOUND_PAGE_CONSTANTS.BACK_HOME}
    </Link>
  </section>
);
