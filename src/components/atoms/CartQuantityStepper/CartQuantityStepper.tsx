import { MinusIcon, PlusIcon } from "@/components/icons";
import { Button, BUTTON_CONSTANTS } from "@/components/atoms/Button";

import { classes } from "./cartQuantityStepperStyles";
import type { TCartQuantityStepperProps } from "./types";
import { CART_QUANTITY_STEPPER_CONSTANTS } from "./cartQuantityStepper.const";

export const CartQuantityStepper = ({
  value,
  disabled,
  onChange,
  canIncrease = true,
}: TCartQuantityStepperProps) => {
  const handleDecrease = () => {
    onChange(Math.max(0, value - 1));
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <div className={classes.root}>
      <Button
        type="button"
        disabled={disabled}
        onClick={handleDecrease}
        className={classes.button}
        variant={BUTTON_CONSTANTS.VARIANTS.GHOST}
        aria-label={CART_QUANTITY_STEPPER_CONSTANTS.DECREASE_QUANTITY_LABEL}
      >
        <MinusIcon width={14} height={14} />
      </Button>
      <span className={classes.value}>{value}</span>
      <Button
        type="button"
        onClick={handleIncrease}
        className={classes.button}
        disabled={disabled || !canIncrease}
        variant={BUTTON_CONSTANTS.VARIANTS.GHOST}
        aria-label={CART_QUANTITY_STEPPER_CONSTANTS.INCREASE_QUANTITY_LABEL}
      >
        <PlusIcon width={14} height={14} />
      </Button>
    </div>
  );
};
