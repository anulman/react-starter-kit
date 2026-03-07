import { forwardRef, useState, type ImgHTMLAttributes } from "react";
import { cva, css, type RecipeVariantProps } from "styled-system/css";

const avatarRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "full",
    overflow: "hidden",
    bg: "surface",
    color: "text.muted",
    fontWeight: "medium",
    flexShrink: 0,
  },
  variants: {
    size: {
      sm: {
        width: "32px",
        height: "32px",
        fontSize: "xs",
      },
      md: {
        width: "40px",
        height: "40px",
        fontSize: "sm",
      },
      lg: {
        width: "48px",
        height: "48px",
        fontSize: "md",
      },
      xl: {
        width: "64px",
        height: "64px",
        fontSize: "lg",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const imageStyles = css({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

type AvatarVariants = RecipeVariantProps<typeof avatarRecipe>;

export type AvatarProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "size"> &
  AvatarVariants & {
    fallback?: string;
  };

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar({ src, alt, fallback, size, className, ...props }, ref) {
    const [hasError, setHasError] = useState(false);

    const showFallback = !src || hasError;

    return (
      <span
        ref={ref}
        className={avatarRecipe({ size }) + (className ? ` ${className}` : "")}
        role="img"
        aria-label={alt}
      >
        {showFallback ? (
          <span>{fallback ?? getInitials(alt)}</span>
        ) : (
          <img
            src={src}
            alt={alt}
            className={imageStyles}
            onError={() => setHasError(true)}
            {...props}
          />
        )}
      </span>
    );
  }
);

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0]?.charAt(0).toUpperCase() ?? "?";
  }
  return (
    (parts[0]?.charAt(0) ?? "") + (parts[parts.length - 1]?.charAt(0) ?? "")
  ).toUpperCase();
}
