import { cx, cva, type RecipeVariantProps } from "styled-system/css";

const spinnerRecipe = cva({
  base: {
    display: "inline-block",
    borderRadius: "full",
    borderWidth: "2px", borderStyle: "solid", borderColor: "stroke",
    borderTopColor: "primary",
    animation: "spin 0.8s linear infinite",
  },
  variants: {
    size: {
      xs: { width: "12px", height: "12px", borderWidth: "1.5px" },
      sm: { width: "16px", height: "16px" },
      md: { width: "24px", height: "24px" },
      lg: { width: "32px", height: "32px" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SpinnerVariants = RecipeVariantProps<typeof spinnerRecipe>;

export type LoadingSpinnerProps = SpinnerVariants & {
  label?: string;
  className?: string;
};

export function LoadingSpinner({ size, label = "Loading...", className }: LoadingSpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cx(spinnerRecipe({ size }), className)}
    />
  );
}
