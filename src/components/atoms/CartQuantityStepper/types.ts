export type TCartQuantityStepperProps = Partial<{
  disabled: boolean;
  canIncrease: boolean;
}> & {
  value: number;
  onChange: (next: number) => void;
};
