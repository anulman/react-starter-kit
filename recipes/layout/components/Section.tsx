import { forwardRef, type HTMLAttributes } from "react";
import { cva, type RecipeVariantProps } from "styled-system/css";

const sectionRecipe = cva({
  base: {
    width: "100%",
    mx: "auto",
  },
  variants: {
    padding: {
      none: { py: "0" },
      sm: { py: "sm" },
      md: { py: "md" },
      lg: { py: "lg" },
      xl: { py: "xl" },
    },
    maxWidth: {
      sm: { maxWidth: "640px" },
      md: { maxWidth: "768px" },
      lg: { maxWidth: "1024px" },
      xl: { maxWidth: "1280px" },
      full: { maxWidth: "100%" },
    },
  },
  defaultVariants: {
    padding: "md",
    maxWidth: "lg",
  },
});

type SectionVariants = RecipeVariantProps<typeof sectionRecipe>;

export type SectionProps = HTMLAttributes<HTMLElement> & SectionVariants;

export const Section = forwardRef<HTMLElement, SectionProps>(
  function Section({ padding, maxWidth, className, ...props }, ref) {
    return (
      <section
        ref={ref}
        className={sectionRecipe({ padding, maxWidth }) + (className ? ` ${className}` : "")}
        {...props}
      />
    );
  }
);
