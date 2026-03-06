import { forwardRef, type TextareaHTMLAttributes, useId } from "react";
import { cx, type RecipeVariantProps } from "styled-system/css";
import { Field, textAreaRecipe } from "./Field";

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
      <Field.Root>
        {label && (
          <Field.Label htmlFor={id} size={size}>
            {label}
          </Field.Label>
        )}
        <Field.TextArea
          ref={ref}
          id={id}
          size={size}
          hasError={!!error}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={cx(className)}
          {...props}
        />
        {error && (
          <Field.Error id={errorId} size={size}>
            {error}
          </Field.Error>
        )}
      </Field.Root>
    );
  }
);
