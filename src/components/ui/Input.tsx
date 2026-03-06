// NOTE: This component bundles label + input + error for convenience.
// For more granular composition, consider a Field pattern:
//   <Field.Root><Field.Label /><Field.Input /><Field.Error /></Field.Root>
// See recipes/forms/ for composition examples.

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
    borderWidth: "1px", borderStyle: "solid", borderColor: "stroke",
    bg: "bg",
    color: "fg",
    transition: "border-color 150ms, box-shadow 150ms",
    _placeholder: {
      color: "fg.muted",
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
      bg: "bg.surface",
    },
  },
  variants: {
    size: {
      sm: {
        px: "sm",
        py: "xs",
        fontSize: "md",
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
    containerProps?: HTMLAttributes<HTMLDivElement>;
  };

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, size, className, containerProps, id: providedId, ...props },
  ref
) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;

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
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cx(className, inputRecipe({ size, hasError: !!error }))}
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
