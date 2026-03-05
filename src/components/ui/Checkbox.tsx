import { forwardRef, useId } from "react";
import { Checkbox as BaseCheckbox } from "@base-ui-components/react/checkbox";
import { css, cva, type RecipeVariantProps } from "styled-system/css";

const checkboxRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "sm",
    border: "1px solid token(colors.border)",
    bg: "background",
    cursor: "pointer",
    transition: "background-color 150ms, border-color 150ms",
    _hover: {
      borderColor: "text.muted",
    },
    _focus: {
      outline: "2px solid token(colors.primary)",
      outlineOffset: "2px",
    },
    "&[data-checked]": {
      bg: "primary",
      borderColor: "primary",
    },
    "&[data-disabled]": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  },
  variants: {
    size: {
      sm: {
        width: "16px",
        height: "16px",
      },
      md: {
        width: "20px",
        height: "20px",
      },
      lg: {
        width: "24px",
        height: "24px",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const indicatorStyles = css({
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const wrapperStyles = css({
  display: "inline-flex",
  alignItems: "center",
  gap: "sm",
});

const checkboxLabelRecipe = cva({
  base: {
    color: "text",
    cursor: "pointer",
    userSelect: "none",
  },
  variants: {
    size: {
      sm: { fontSize: "sm" },
      md: { fontSize: "md" },
      lg: { fontSize: "lg" },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type CheckboxVariants = RecipeVariantProps<typeof checkboxRecipe>;

export type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  name?: string;
  value?: string;
  id?: string;
  className?: string;
} & CheckboxVariants;

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  function Checkbox(
    { label, size, className, id: providedId, checked, defaultChecked, onCheckedChange, disabled, name, value },
    ref
  ) {
    const generatedId = useId();
    const id = providedId ?? generatedId;

    return (
      <div className={wrapperStyles}>
        <BaseCheckbox.Root
          ref={ref}
          id={id}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          name={name}
          value={value}
          className={checkboxRecipe({ size }) + (className ? ` ${className}` : "")}
        >
          <BaseCheckbox.Indicator className={indicatorStyles}>
            <CheckIcon size={size} />
          </BaseCheckbox.Indicator>
        </BaseCheckbox.Root>
        {label && (
          <label htmlFor={id} className={checkboxLabelRecipe({ size })}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

function CheckIcon({ size }: { size?: "sm" | "md" | "lg" }) {
  const iconSize = size === "sm" ? 12 : size === "lg" ? 18 : 14;
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
