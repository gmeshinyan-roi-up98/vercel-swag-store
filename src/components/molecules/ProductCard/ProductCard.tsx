import Image from "next/image";
import Link from "next/link";

import { formatCategory, formatPrice } from "@/lib/format";

import { PRODUCT_CARD_CONSTANTS } from "./productCard.const";
import { classes } from "./productCardStyles";
import type { TProductCardProps } from "./types";

export const ProductCard = ({
  product,
  priority = false,
  showFeaturedBadge = false,
}: TProductCardProps) => {
  const image = product.images[0];
  const isFeatured = showFeaturedBadge || product.featured;

  return (
    <Link href={`/products/${product.slug}`} className={classes.link}>
      <div className={classes.mediaWrap}>
        {image ? (
          <Image
            fill
            src={image}
            alt={product.name}
            priority={priority}
            fetchPriority="high"
            className={classes.image}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : null}
        {isFeatured && (
          <span aria-hidden className={classes.featuredBadge}>
            {PRODUCT_CARD_CONSTANTS.FEATURED_BADGE}
          </span>
        )}
      </div>

      <div className={classes.body}>
        <p className={classes.category}>{formatCategory(product.category)}</p>
        <p className={classes.title}>{product.name}</p>
        <p className={classes.price}>
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
};
