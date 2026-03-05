import {
  forwardRef,
  type InputHTMLAttributes,
  type HTMLAttributes,
  useId,
} from "react";
import { Input as BaseInput } from "@base-ui-components/react/input";
import { cx, cva, type RecipeVariantProps } from "styled-system/css";
import { labelRecipe, errorRecipe } from "./fieldStyles";

const inputRecipe = cva({
  base: {
    width: "100%",
    borderRadius: "sm",
    border: "1px solid token(colors.border)",
    bg: "background",
    color: "text",
    transition: "border-color 150ms, box-shadow 150ms",
    _placeholder: {
      color: "text.muted",
    },
    _hover: {
      borderColor: "text.muted",
    },
    _focus: {
      outline: "none",
      borderColor: "primary",
      boxShadow: "0 0 0 1px token(colors.primary)",
    },
    _disabled: {
      opacity: 0.5,
      cursor: "not-allowed",
      bg: "surface",
    },
  },
  variants: {
    size: {
      min: {
        px: "xs",
        py: "2px",
        fontSize: "16px",
        minHeight: "min-content",
      },
      sm: {
        px: "sm",
        py: "xs",
        fontSize: "md", // 16px minimum prevents iOS auto-zoom on focus
        minHeight: "32px",
      },
      md: {
        px: "md",
        py: "sm",
        fontSize: "md",
        minHeight: "40px",
      },
      lg: {
        px: "md",
        py: "md",
        fontSize: "lg",
        minHeight: "48px",
      },
    },
    hasError: {
      true: {
        borderColor: "danger",
        _focus: {
          borderColor: "danger",
          boxShadow: "0 0 0 1px token(colors.danger)",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type InputVariants = RecipeVariantProps<typeof inputRecipe>;

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  InputVariants & {
    label?: string;
    error?: string;
    /** Props applied to the wrapper div (for layout, e.g., className, style) */
    containerProps?: HTMLAttributes<HTMLDivElement>;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    error,
    size,
    className,
    containerProps,
    id: providedId,
    type,
    placeholder,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;

  const inputClassName = cx(
    className,
    inputRecipe({ size, hasError: !!error })
  );

  // Default placeholder for phone inputs (without country code - shown in selector)
  const resolvedPlaceholder =
    type === "tel" && !placeholder ? "555 123 4567" : placeholder;

  return (
    <div {...containerProps}>
      {label && (
        <label htmlFor={id} className={labelRecipe({ size })}>
          {label}
        </label>
      )}
      <BaseInput
        ref={ref}
        id={id}
        type={type}
        placeholder={resolvedPlaceholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={inputClassName}
        {...props}
      />
      {error && (
        <p id={errorId} className={errorRecipe({ size })}>
          {error}
        </p>
      )}
    </div>
  );
});
