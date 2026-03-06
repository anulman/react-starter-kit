import { type TextareaHTMLAttributes, type Ref, useId } from "react";
import { cx, type RecipeVariantProps } from "styled-system/css";
import { Field, textAreaRecipe } from "./Field";

type TextAreaVariants = RecipeVariantProps<typeof textAreaRecipe>;

export type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> &
  TextAreaVariants & {
    label?: string;
    error?: string;
    ref?: Ref<HTMLTextAreaElement>;
  };

export function TextArea({
  label, error, size, className, id: providedId, ref, ...props
}: TextAreaProps) {
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
