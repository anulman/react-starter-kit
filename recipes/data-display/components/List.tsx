import { forwardRef, type HTMLAttributes } from "react";
import { cva, type RecipeVariantProps } from "styled-system/css";

const listRecipe = cva({
  base: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  variants: {
    spacing: {
      none: { "& > li": { py: "0" } },
      sm: { "& > li": { py: "xs" } },
      md: { "& > li": { py: "sm" } },
      lg: { "& > li": { py: "md" } },
    },
    divided: {
      true: {
        "& > li + li": {
          borderTop: "1px solid token(colors.border)",
        },
      },
    },
  },
  defaultVariants: {
    spacing: "md",
  },
});

type ListVariants = RecipeVariantProps<typeof listRecipe>;

export type ListProps = HTMLAttributes<HTMLUListElement | HTMLOListElement> &
  ListVariants & {
    as?: "ul" | "ol";
  };

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(
  function List({ as: Component = "ul", spacing, divided, className, ...props }, ref) {
    return (
      <Component
        ref={ref as React.Ref<HTMLUListElement & HTMLOListElement>}
        className={listRecipe({ spacing, divided }) + (className ? ` ${className}` : "")}
        {...props}
      />
    );
  }
);
