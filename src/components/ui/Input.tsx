import { forwardRef, type InputHTMLAttributes, type HTMLAttributes, useId } from "react";
import { cx, type RecipeVariantProps } from "styled-system/css";
import { Field, inputRecipe } from "./Field";

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
    <Field.Root {...containerProps}>
      {label && (
        <Field.Label htmlFor={id} size={size}>
          {label}
        </Field.Label>
      )}
      <Field.Input
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
});
