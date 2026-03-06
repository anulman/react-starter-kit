import { forwardRef, type HTMLAttributes } from "react";
import { cx, cva, type RecipeVariantProps } from "styled-system/css";

const badgeRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "full",
    fontWeight: "medium",
    whiteSpace: "nowrap",
  },
  variants: {
    variant: {
      default: { bg: "bg.surface", color: "fg" },
      primary: { bg: "primary", color: "white" },
      success: { bg: "success", color: "white" },
      warning: { bg: "warning", color: "fg" },
      danger: { bg: "danger", color: "white" },
    },
    size: {
      sm: { px: "xs", py: "0", fontSize: "xs", minHeight: "20px" },
      md: { px: "sm", py: "xs", fontSize: "sm", minHeight: "24px" },
      lg: { px: "md", py: "xs", fontSize: "md", minHeight: "28px" },
    },
  },
  defaultVariants: { variant: "default", size: "md" },
});

type BadgeVariants = RecipeVariantProps<typeof badgeRecipe>;

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & BadgeVariants;

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ variant, size, className, ...props }, ref) {
    return (
      <span
        ref={ref}
        className={cx(badgeRecipe({ variant, size }), className)}
        {...props}
      />
    );
  }
);
