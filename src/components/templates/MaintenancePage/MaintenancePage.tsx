import { classes } from "./maintenancePageStyles";
import { MAINTENANCE_PAGE_CONSTANTS } from "./maintenancePage.const";

export const MaintenancePageTemplate = () => (
  <section className={classes.root}>
    <p className={classes.kicker}>{MAINTENANCE_PAGE_CONSTANTS.KICKER}</p>
    <h1 className={classes.title}>{MAINTENANCE_PAGE_CONSTANTS.TITLE}</h1>
    <p className={classes.description}>
      {MAINTENANCE_PAGE_CONSTANTS.DESCRIPTION}
    </p>
  </section>
);
