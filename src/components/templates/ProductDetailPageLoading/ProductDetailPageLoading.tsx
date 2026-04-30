import { classes } from "./productDetailPageLoadingStyles";

export const ProductDetailPageLoadingTemplate = () => (
  <article aria-hidden className={classes.article}>
    <div className={classes.breadcrumb}>
      <div className={classes.breadcrumbLine} />
    </div>

    <div className={classes.grid}>
      <div className={classes.media}>
        <div className={classes.mediaFill} />
      </div>

      <div className={classes.panel}>
        <div className={classes.categoryLine} />
        <div className={classes.titleLine} />
        <div className={classes.priceLine} />

        <div className={classes.stockBlock}>
          <div className={classes.stockLine} />
          <div className={classes.actionsRow}>
            <div className={classes.actionShort} />
            <div className={classes.actionGrow} />
          </div>
        </div>

        <div className={classes.descriptionStack}>
          <div className={classes.descriptionLine} />
          <div className={classes.descriptionLine} />
          <div className={classes.descriptionLineShort} />
        </div>

        <div className={classes.tagsRow}>
          <div className={classes.tagPill} />
          <div className={classes.tagPill} />
          <div className={classes.tagPill} />
        </div>

        <div className={classes.browseLine} />
      </div>
    </div>
  </article>
);
