import { type InputHTMLAttributes, type HTMLAttributes, type Ref, useId } from "react";
import { cx, type RecipeVariantProps } from "styled-system/css";
import { Field, inputRecipe } from "./Field";

type InputVariants = RecipeVariantProps<typeof inputRecipe>;

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  InputVariants & {
    label?: string;
    error?: string;
    containerProps?: HTMLAttributes<HTMLDivElement>;
    ref?: Ref<HTMLInputElement>;
  };

export function Input({
  label, error, size, className, containerProps, id: providedId, ref, ...props
}: InputProps) {
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
}
