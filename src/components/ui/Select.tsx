import { useId, type ReactNode } from "react";
import { Select as BaseSelect } from "@base-ui-components/react/select";
import { cva, css, type RecipeVariantProps } from "styled-system/css";
import { labelRecipe, errorRecipe } from "./fieldStyles";
import { ChevronDownIcon } from "@/components/icons";
import { LoadingSpinner } from "./LoadingSpinner";

const triggerRecipe = cva({
  base: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "sm",
    border: "1px solid token(colors.border)",
    bg: "background",
    color: "text",
    cursor: "pointer",
    transition: "border-color 150ms, box-shadow 150ms",
    _hover: { borderColor: "text.muted" },
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
    "&[data-popup-open]": {
      borderColor: "primary",
      boxShadow: "0 0 0 1px token(colors.primary)",
    },
  },
  variants: {
    size: {
      sm: { px: "sm", py: "xs", fontSize: "sm", minHeight: "32px" },
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

const positionerStyles = css({ zIndex: 1 });

const popupStyles = css({
  bg: "background",
  border: "1px solid token(colors.border)",
  borderRadius: "sm",
  boxShadow: "md",
  py: "xs",
  minWidth: "var(--anchor-width)",
  maxHeight: "300px",
  overflow: "auto",
});

const optionRecipe = cva({
  base: {
    px: "md",
    py: "sm",
    cursor: "pointer",
    transition: "background-color 100ms",
    _hover: {
      bg: "surface",
      "&[data-selected]": { color: "text", textDecoration: "underline" },
    },
    "&[data-highlighted]": { bg: "surface" },
    "&[data-selected]": { bg: "primary", color: "white" },
  },
  variants: {
    size: {
      sm: { fontSize: "sm", py: "xs" },
      md: { fontSize: "md", py: "sm" },
      lg: { fontSize: "lg", py: "md" },
    },
  },
  defaultVariants: { size: "md" },
});

const placeholderStyles = css({ color: "text.muted" });

type SelectVariants = RecipeVariantProps<typeof triggerRecipe>;

export type SelectOption = {
  value: string;
  label: ReactNode;
  disabled?: boolean;
};

export type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  label?: string;
  "aria-label"?: string;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  name?: string;
  id?: string;
  className?: string;
  triggerLabel?: ReactNode;
  alignItemWithTrigger?: boolean;
  sideOffset?: number;
} & SelectVariants;

const spinnerSizeMap = { sm: "xs", md: "xs", lg: "sm" } as const;

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select...",
  label,
  "aria-label": ariaLabel,
  error,
  disabled,
  loading,
  name,
  size = "md",
  id: providedId,
  className,
  triggerLabel,
  alignItemWithTrigger = true,
  sideOffset = 0,
}: SelectProps) {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const errorId = `${id}-error`;
  const isDisabled = disabled || loading;

  return (
    <div>
      {label && (
        <label htmlFor={id} className={labelRecipe({ size })}>
          {label}
        </label>
      )}
      <BaseSelect.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={isDisabled}
        name={name}
        items={options}
      >
        <BaseSelect.Trigger
          id={id}
          aria-label={ariaLabel}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className={triggerRecipe({ size, hasError: !!error }) + (className ? ` ${className}` : "")}
        >
          {triggerLabel ? (
            <>
              {triggerLabel}
              {loading && <LoadingSpinner size={spinnerSizeMap[size]} label="Loading options" />}
            </>
          ) : (
            <>
              <BaseSelect.Value>
                {(value) => {
                  if (value == null) {
                    return <span className={placeholderStyles}>{placeholder}</span>;
                  }
                  const selectedOption = options.find((opt) => opt.value === value);
                  return selectedOption?.label ?? value;
                }}
              </BaseSelect.Value>
              <BaseSelect.Icon>
                {loading ? (
                  <LoadingSpinner size={spinnerSizeMap[size]} label="Loading options" />
                ) : (
                  <ChevronDownIcon />
                )}
              </BaseSelect.Icon>
            </>
          )}
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner
            className={positionerStyles}
            alignItemWithTrigger={alignItemWithTrigger}
            sideOffset={sideOffset}
          >
            <BaseSelect.Popup className={popupStyles}>
              {options.map((option) => (
                <BaseSelect.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={optionRecipe({ size })}
                >
                  <BaseSelect.ItemText>{option.label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {error && (
        <p id={errorId} className={errorRecipe({ size })}>
          {error}
        </p>
      )}
    </div>
  );
}
