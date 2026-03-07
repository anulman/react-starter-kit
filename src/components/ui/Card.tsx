import { forwardRef, type HTMLAttributes } from "react";
import { cva, type RecipeVariantProps } from "styled-system/css";

const cardRecipe = cva({
  base: {
    bg: "background",
    borderRadius: "md",
    border: "1px solid token(colors.border)",
  },
  variants: {
    padding: {
      none: { p: "0" },
      sm: { p: "sm" },
      md: { p: "md" },
      lg: { p: "lg" },
    },
    shadow: {
      none: {},
      sm: { boxShadow: "sm" },
      md: { boxShadow: "md" },
      lg: { boxShadow: "lg" },
    },
    hoverable: {
      true: {
        transition: "box-shadow 150ms, transform 150ms",
        cursor: "pointer",
        _hover: {
          boxShadow: "md",
          transform: "translateY(-2px)",
        },
      },
    },
  },
  defaultVariants: {
    padding: "md",
    shadow: "none",
  },
});

type CardVariants = RecipeVariantProps<typeof cardRecipe>;

export type CardProps = HTMLAttributes<HTMLDivElement> & CardVariants;

export const Card = forwardRef<HTMLDivElement, CardProps>(
  function Card({ padding, shadow, hoverable, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={cardRecipe({ padding, shadow, hoverable }) + (className ? ` ${className}` : "")}
        {...props}
      />
    );
  }
);
