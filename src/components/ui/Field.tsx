import { type HTMLAttributes, type InputHTMLAttributes, type LabelHTMLAttributes, type TextareaHTMLAttributes, type Ref } from "react";
import { Input as BaseInput } from "@base-ui-components/react/input";
import { css, cx, type RecipeVariantProps } from "styled-system/css";
import { labelRecipe, errorRecipe } from "./fieldStyles";

// Re-export shared recipes for external use
export { labelRecipe, errorRecipe } from "./fieldStyles";

const rootStyles = css({
  display: "flex",
  flexDirection: "column",
});

// --- Field.Root ---

type RootProps = HTMLAttributes<HTMLDivElement>;

function Root({ className, ...props }: RootProps) {
  return <div className={cx(rootStyles, className)} {...props} />;
}

// --- Field.Label ---

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & RecipeVariantProps<typeof labelRecipe>;

function Label({ size, className, ...props }: LabelProps) {
  return <label className={cx(labelRecipe({ size }), className)} {...props} />;
}

// --- Field.Input ---

import { cva } from "styled-system/css";

const inputRecipe = cva({
  base: {
    width: "100%",
    borderRadius: "sm",
    borderWidth: "1px", borderStyle: "solid", borderColor: "stroke",
    bg: "bg",
    color: "fg",
    transition: "border-color 150ms, box-shadow 150ms",
    _placeholder: { color: "fg.muted" },
    _hover: { borderColor: "text.muted" },
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
      sm: { px: "sm", py: "xs", fontSize: "md", minHeight: "32px" },
      md: { px: "md", py: "sm", fontSize: "md", minHeight: "40px" },
      lg: { px: "md", py: "md", fontSize: "lg", minHeight: "48px" },
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
  defaultVariants: { size: "md" },
});

export { inputRecipe };

type InputVariants = RecipeVariantProps<typeof inputRecipe>;

type FieldInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & InputVariants & {
  ref?: Ref<HTMLInputElement>;
};

function FieldInput({ size, hasError, className, ref, ...props }: FieldInputProps) {
  return (
    <BaseInput
      ref={ref}
      className={cx(inputRecipe({ size, hasError }), className)}
      {...props}
    />
  );
}

// --- Field.TextArea ---

const textAreaRecipe = cva({
  base: {
    width: "100%",
    borderRadius: "sm",
    borderWidth: "1px", borderStyle: "solid", borderColor: "stroke",
    bg: "bg",
    color: "fg",
    resize: "vertical",
    minHeight: "80px",
    transition: "border-color 150ms, box-shadow 150ms",
    _placeholder: { color: "fg.muted" },
    _hover: { borderColor: "text.muted" },
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
      sm: { px: "sm", py: "xs", fontSize: "sm" },
      md: { px: "md", py: "sm", fontSize: "md" },
      lg: { px: "md", py: "md", fontSize: "lg" },
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
  defaultVariants: { size: "md" },
});

export { textAreaRecipe };

type TextAreaVariants = RecipeVariantProps<typeof textAreaRecipe>;

type FieldTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> & TextAreaVariants & {
  ref?: Ref<HTMLTextAreaElement>;
};

function FieldTextArea({ size, hasError, className, ref, ...props }: FieldTextAreaProps) {
  return (
    <textarea
      ref={ref}
      className={cx(textAreaRecipe({ size, hasError }), className)}
      {...props}
    />
  );
}

// --- Field.Error ---

type ErrorProps = HTMLAttributes<HTMLParagraphElement> & RecipeVariantProps<typeof errorRecipe>;

function Error({ size, className, ...props }: ErrorProps) {
  return <p className={cx(errorRecipe({ size }), className)} {...props} />;
}

// --- Export ---

export const Field = {
  Root,
  Label,
  Input: FieldInput,
  TextArea: FieldTextArea,
  Error,
};
