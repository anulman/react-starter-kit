import {
  forwardRef,
  useRef,
  useCallback,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
} from "react";
import { cva, cx, css, type RecipeVariantProps } from "styled-system/css";
import { labelRecipe, errorRecipe } from "@/components/ui/fieldStyles";

const containerRecipe = cva({
  base: { display: "flex", gap: "sm", justifyContent: "center" },
});

const digitRecipe = cva({
  base: {
    width: "48px",
    height: "56px",
    textAlign: "center",
    fontSize: "xl",
    fontWeight: "semibold",
    borderRadius: "sm",
    border: "1px solid token(colors.border)",
    bg: "background",
    color: "text",
    transition: "border-color 150ms, box-shadow 150ms",
    _hover: { borderColor: "text.muted" },
    _focus: {
      outline: "none",
      borderColor: "primary",
      boxShadow: "0 0 0 1px token(colors.primary)",
    },
    _disabled: { opacity: 0.5, cursor: "not-allowed", bg: "surface" },
  },
  variants: {
    size: {
      sm: { width: "40px", height: "48px", fontSize: "lg" },
      md: { width: "48px", height: "56px", fontSize: "xl" },
      lg: { width: "56px", height: "64px", fontSize: "2xl" },
    },
    hasError: {
      true: {
        borderColor: "danger",
        _focus: { borderColor: "danger", boxShadow: "0 0 0 1px token(colors.danger)" },
      },
    },
  },
  defaultVariants: { size: "md" },
});

type DigitVariants = RecipeVariantProps<typeof digitRecipe>;

export type OtpInputProps = DigitVariants & {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
};

export const OtpInput = forwardRef<HTMLInputElement, OtpInputProps>(
  function OtpInput(
    { length = 6, value, onChange, onComplete, label, error, size, disabled, autoFocus, className },
    ref
  ) {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const setRef = useCallback(
      (index: number) => (el: HTMLInputElement | null) => {
        inputRefs.current[index] = el;
        if (index === 0 && ref) {
          if (typeof ref === "function") ref(el);
          else ref.current = el;
        }
      },
      [ref]
    );

    const focusInput = useCallback((index: number) => {
      const input = inputRefs.current[index];
      if (input) { input.focus(); input.select(); }
    }, []);

    const handleChange = useCallback(
      (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const digits = e.target.value.replace(/\D/g, "");
        if (digits.length > 1) {
          const autofilled = digits.slice(0, length);
          onChange(autofilled);
          focusInput(Math.min(autofilled.length, length - 1));
          if (autofilled.length === length && onComplete) {
            requestAnimationFrame(() => onComplete(autofilled));
          }
          return;
        }
        const digit = digits.slice(-1);
        const chars = value.split("");
        chars[index] = digit;
        const newValue = chars.join("").slice(0, length);
        onChange(newValue);
        if (digit && index < length - 1) focusInput(index + 1);
        if (newValue.length === length && onComplete) {
          requestAnimationFrame(() => onComplete(newValue));
        }
      },
      [value, length, onChange, onComplete, focusInput]
    );

    const handleKeyDown = useCallback(
      (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
          if (!value[index] && index > 0) focusInput(index - 1);
          else {
            const chars = value.split("");
            chars[index] = "";
            onChange(chars.join(""));
          }
        } else if (e.key === "ArrowLeft" && index > 0) {
          e.preventDefault(); focusInput(index - 1);
        } else if (e.key === "ArrowRight" && index < length - 1) {
          e.preventDefault(); focusInput(index + 1);
        }
      },
      [value, length, onChange, focusInput]
    );

    const handlePaste = useCallback(
      (e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (pasted) {
          onChange(pasted);
          focusInput(Math.min(pasted.length, length - 1));
          if (pasted.length === length && onComplete) {
            requestAnimationFrame(() => onComplete(pasted));
          }
        }
      },
      [length, onChange, onComplete, focusInput]
    );

    const digits = Array.from({ length }, (_, i) => value[i] || "");

    return (
      <div className={className}>
        {label && <label className={labelRecipe({ size })}>{label}</label>}
        <div className={containerRecipe()}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={setRef(index)}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              name={`otp-${index}`}
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              disabled={disabled}
              autoFocus={autoFocus && index === 0}
              aria-label={`Digit ${index + 1} of ${length}`}
              className={cx(digitRecipe({ size, hasError: !!error }))}
            />
          ))}
        </div>
        {error && (
          <p className={cx(errorRecipe({ size }), css({ textAlign: "center" }))}>{error}</p>
        )}
      </div>
    );
  }
);
