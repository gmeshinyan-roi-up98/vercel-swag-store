import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { ROUTES } from "@/constants";

import { HomeHeroFeaturedNavLink } from "./HomeHeroFeaturedNavLink";
import { HOME_HERO_CONSTANTS } from "./homeHero.const";
import { classes } from "./homeHeroStyles";
import type { THomeHeroProps } from "./types";

export const HomeHero = ({ heroImageAlt, heroImageSrc }: THomeHeroProps) => {
  const resolvedAlt = heroImageAlt ?? HOME_HERO_CONSTANTS.HERO_IMAGE_ALT;
  const resolvedSrc = heroImageSrc ?? HOME_HERO_CONSTANTS.HERO_IMAGE_URL;

  return (
    <section className={classes.heroSection}>
      <div className={classes.heroInner}>
        <div>
          <h1 className={classes.heroTitle}>
            {HOME_HERO_CONSTANTS.HERO_TITLE}
          </h1>
          <p className={classes.heroSubtitle}>
            {HOME_HERO_CONSTANTS.HERO_SUBTITLE}
          </p>
          <div className={classes.heroActions}>
            <Link href={ROUTES.SEARCH} className="btn-primary">
              {HOME_HERO_CONSTANTS.SHOP_NOW}
              <ArrowRightIcon width={16} height={16} />
            </Link>
            <HomeHeroFeaturedNavLink className="btn-secondary" />
          </div>
        </div>

        <div className={classes.heroMedia}>
          <Image
            fill
            priority
            alt={resolvedAlt}
            src={resolvedSrc}
            fetchPriority="high"
            className={classes.heroMediaImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};
