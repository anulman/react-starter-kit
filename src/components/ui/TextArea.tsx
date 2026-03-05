import { forwardRef, type TextareaHTMLAttributes, useId } from "react";
import { cva, type RecipeVariantProps } from "styled-system/css";
import { labelRecipe, errorRecipe } from "./fieldStyles";

const textAreaRecipe = cva({
  base: {
    width: "100%",
    borderRadius: "sm",
    border: "1px solid token(colors.border)",
    bg: "background",
    color: "text",
    resize: "vertical",
    minHeight: "80px",
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
      sm: {
        px: "sm",
        py: "xs",
        fontSize: "sm",
      },
      md: {
        px: "md",
        py: "sm",
        fontSize: "md",
      },
      lg: {
        px: "md",
        py: "md",
        fontSize: "lg",
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

type TextAreaVariants = RecipeVariantProps<typeof textAreaRecipe>;

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> &
  TextAreaVariants & {
    label?: string;
    error?: string;
  };

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ label, error, size, className, id: providedId, ...props }, ref) {
    const generatedId = useId();
    const id = providedId ?? generatedId;
    const errorId = `${id}-error`;

    return (
      <div>
        {label && (
          <label htmlFor={id} className={labelRecipe({ size })}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={textAreaRecipe({ size, hasError: !!error }) + (className ? ` ${className}` : "")}
          {...props}
        />
        {error && (
          <p id={errorId} className={errorRecipe({ size })}>
            {error}
          </p>
        )}
      </div>
    );
  }
);
