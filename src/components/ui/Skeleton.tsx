import { cva, type RecipeVariantProps } from "styled-system/css";

const skeletonRecipe = cva({
  base: {
    bg: "surface",
    animation: "pulse 1.5s ease-in-out infinite",
  },
  variants: {
    variant: {
      text: {
        height: "1em",
        borderRadius: "sm",
      },
      circular: {
        borderRadius: "full",
      },
      rectangular: {
        borderRadius: "sm",
      },
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

type SkeletonVariants = RecipeVariantProps<typeof skeletonRecipe>;

export type SkeletonProps = SkeletonVariants & {
  width?: string | number;
  height?: string | number;
  className?: string;
};

export function Skeleton({ variant, width, height, className }: SkeletonProps) {
  const style: React.CSSProperties = {};
  if (width) style.width = typeof width === "number" ? `${width}px` : width;
  if (height) style.height = typeof height === "number" ? `${height}px` : height;

  // For circular variant, if only width is set, make it square
  if (variant === "circular" && width && !height) {
    style.height = style.width;
  }

  return (
    <div
      className={skeletonRecipe({ variant }) + (className ? ` ${className}` : "")}
      style={style}
      aria-hidden="true"
    />
  );
}
