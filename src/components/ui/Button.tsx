import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Button as BaseButton } from "@base-ui-components/react/button";
import { cx, cva, type RecipeVariantProps } from "styled-system/css";
import { LoadingSpinner } from "./LoadingSpinner";

const buttonRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "sm",
    borderRadius: "sm",
    fontWeight: "medium",
    cursor: "pointer",
    transition: "background-color 150ms, border-color 150ms, opacity 150ms",
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    _focus: {
      outline: "2px solid token(colors.primary)",
      outlineOffset: "2px",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "primary",
        color: "white",
        _hover: {
          bg: "primary.hover",
        },
      },
      secondary: {
        bg: "bg.surface",
        color: "fg",
        borderWidth: "1px", borderStyle: "solid", borderColor: "stroke",
        _hover: {
          bg: "bg",
          borderColor: "text.muted",
        },
      },
      danger: {
        bg: "danger",
        color: "white",
        _hover: {
          opacity: 0.9,
        },
      },
      ghost: {
        bg: "transparent",
        color: "fg",
        _hover: {
          bg: "bg.surface",
        },
      },
    },
    size: {
      sm: {
        px: "sm",
        py: "xs",
        fontSize: "sm",
        minHeight: "32px",
      },
      md: {
        px: "md",
        py: "sm",
        fontSize: "md",
        minHeight: "40px",
      },
      lg: {
        px: "lg",
        py: "md",
        fontSize: "lg",
        minHeight: "48px",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonVariants = RecipeVariantProps<typeof buttonRecipe>;

export type ButtonProps = ComponentPropsWithoutRef<typeof BaseButton> &
  ButtonVariants & {
    loading?: boolean;
  };

const spinnerSizeMap = {
  sm: "xs",
  md: "sm",
  lg: "sm",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant, size = "md", className, loading, disabled, children, ...props }, ref) {
    const isDisabled = disabled || loading;

    return (
      <BaseButton
        ref={ref}
        disabled={isDisabled}
        className={cx(buttonRecipe({ variant, size }), typeof className === "string" ? className : undefined)}
        {...props}
      >
        {loading && <LoadingSpinner size={spinnerSizeMap[size]} label="Loading" />}
        {children}
      </BaseButton>
    );
  }
);
