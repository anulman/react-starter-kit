import { forwardRef, type HTMLAttributes } from "react";
import { cva, type RecipeVariantProps } from "styled-system/css";

const headerRecipe = cva({
  base: {
    width: "100%",
    bg: "background",
    borderBottom: "1px solid token(colors.border)",
    display: "flex",
    alignItems: "center",
  },
  variants: {
    size: {
      sm: { px: "md", py: "xs", minHeight: "48px" },
      md: { px: "md", py: "sm", minHeight: "56px" },
      lg: { px: "lg", py: "md", minHeight: "64px" },
    },
    sticky: {
      true: {
        position: "sticky",
        top: 0,
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type HeaderVariants = RecipeVariantProps<typeof headerRecipe>;

export type HeaderProps = HTMLAttributes<HTMLElement> & HeaderVariants;

export const Header = forwardRef<HTMLElement, HeaderProps>(function Header(
  { size, sticky, className, ...props },
  ref
) {
  return (
    <header
      ref={ref}
      className={
        headerRecipe({ size, sticky }) + (className ? ` ${className}` : "")
      }
      {...props}
    />
  );
});
