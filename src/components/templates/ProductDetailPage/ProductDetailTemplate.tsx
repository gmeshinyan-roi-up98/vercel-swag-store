import Image from "next/image";
import Link from "next/link";

import { ROUTES } from "@/constants";
import { ArrowRightIcon } from "@/components/icons";
import { PRODUCT_CARD_CONSTANTS } from "@/components/molecules/ProductCard/productCard.const";
import { classes as productCardClasses } from "@/components/molecules/ProductCard/productCardStyles";
import { cn, formatCategory, formatPrice } from "@/lib";

import { classes } from "./productDetailPageStyles";
import type { TProductDetailTemplateProps } from "./types";
import { PRODUCT_DETAIL_PAGE_CONSTANTS } from "./productDetailPage.const";

export const ProductDetailTemplate = ({
  product,
  className,
  interactiveSlot,
  showFeaturedBadge = false,
}: TProductDetailTemplateProps) => {
  const isFeatured = showFeaturedBadge || product.featured;

  return (
    <article className={cn(classes.article, className)}>
      <nav
        className={classes.breadcrumbNav}
        aria-label={PRODUCT_DETAIL_PAGE_CONSTANTS.BREADCRUMB_NAV_LABEL}
      >
        <ol className={classes.breadcrumbList}>
          <li>
            <Link href={ROUTES.HOME} className="hover:text-foreground">
              {PRODUCT_DETAIL_PAGE_CONSTANTS.BREADCRUMB_HOME}
            </Link>
          </li>
          <li aria-hidden="true">{PRODUCT_DETAIL_PAGE_CONSTANTS.SEPARATOR}</li>
          <li>
            <Link
              className="hover:text-foreground"
              href={`/search?category=${product.category}`}
            >
              {formatCategory(product.category)}
            </Link>
          </li>
          <li aria-hidden="true">{PRODUCT_DETAIL_PAGE_CONSTANTS.SEPARATOR}</li>
          <li className={classes.breadcrumbCurrent}>{product.name}</li>
        </ol>
      </nav>

      <div className={classes.grid}>
        <div className={classes.media}>
          {product.images[0] && (
            <Image
              fill
              priority
              fetchPriority="high"
              alt={product.name}
              src={product.images[0]}
              className={classes.mediaImage}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
          {isFeatured ? (
            <span aria-hidden className={productCardClasses.featuredBadge}>
              {PRODUCT_CARD_CONSTANTS.FEATURED_BADGE}
            </span>
          ) : null}
        </div>

        <div className={classes.panel}>
          <p className={classes.category}>{formatCategory(product.category)}</p>
          <h1 className={classes.title}>{product.name}</h1>
          <p className={classes.price}>
            {formatPrice(product.price, product.currency)}
          </p>

          {interactiveSlot}

          <p className={classes.description}>{product.description}</p>

          {product.tags.length > 0 && (
            <ul className={classes.tagsList}>
              {product.tags.map((tag) => (
                <li key={tag} className={classes.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}

          <Link href={ROUTES.SEARCH} className={classes.browseLink}>
            {PRODUCT_DETAIL_PAGE_CONSTANTS.CONTINUE_BROWSING}
            <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};
