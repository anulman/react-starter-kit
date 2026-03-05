import { forwardRef, type HTMLAttributes } from "react";
import { cva, type RecipeVariantProps } from "styled-system/css";

const sidebarRecipe = cva({
  base: {
    height: "100%",
    bg: "background",
    borderRight: "1px solid token(colors.border)",
    overflow: "auto",
    flexShrink: 0,
    transition: "width 200ms",
  },
  variants: {
    width: {
      sm: { width: "200px" },
      md: { width: "256px" },
      lg: { width: "320px" },
    },
    collapsed: {
      true: { width: "64px" },
    },
  },
  defaultVariants: {
    width: "md",
  },
});

type SidebarVariants = RecipeVariantProps<typeof sidebarRecipe>;

export type SidebarProps = HTMLAttributes<HTMLElement> & SidebarVariants;

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  function Sidebar({ width, collapsed, className, ...props }, ref) {
    return (
      <aside
        ref={ref}
        className={sidebarRecipe({ width, collapsed }) + (className ? ` ${className}` : "")}
        {...props}
      />
    );
  }
);
