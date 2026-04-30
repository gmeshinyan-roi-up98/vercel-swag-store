import { cacheLife } from "next/cache";

import { siteConfig } from "@/lib/site-config";

import { FOOTER_CONSTANTS } from "./footer.const";
import { classes } from "./footerStyles";

const getCurrentYear = async (): Promise<number> => {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
};

export const Footer = async () => {
  const year = await getCurrentYear();

  return (
    <footer className={classes.footer}>
      <div className={classes.inner}>
        <p>
          &copy; {year} {siteConfig.name}
          {FOOTER_CONSTANTS.COPYRIGHT_TAIL}
        </p>
      </div>
    </footer>
  );
};
