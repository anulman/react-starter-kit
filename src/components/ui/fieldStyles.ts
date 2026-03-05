import { cva } from "styled-system/css";

export const labelRecipe = cva({
  base: {
    display: "block",
    fontWeight: "medium",
    color: "text",
    marginBottom: "xs",
  },
  variants: {
    size: {
      min: { fontSize: "xs" },
      sm: { fontSize: "xs" },
      md: { fontSize: "sm" },
      lg: { fontSize: "md" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const errorRecipe = cva({
  base: {
    color: "danger",
    marginTop: "xs",
  },
  variants: {
    size: {
      min: { fontSize: "xs" },
      sm: { fontSize: "xs" },
      md: { fontSize: "sm" },
      lg: { fontSize: "md" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
