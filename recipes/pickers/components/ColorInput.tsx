/**
 * ColorInput Component
 *
 * A compact color input with an expandable picker panel featuring preset colors
 * and a custom color picker.
 *
 * Uses `react-colorful` (https://github.com/omgovich/react-colorful) for the
 * custom color picker. This library was chosen for its:
 * - Zero dependencies and small bundle size (~2KB)
 * - Accessible and keyboard navigable
 * - CSS-in-JS styling support (we override styles via Panda CSS)
 */

import { useState, useRef, forwardRef, useEffect, useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import { css } from "styled-system/css";
import { PRESET_COLORS, PRESET_COLOR_ROWS } from "@/lib/colors";
import { useKeyboardDirections } from "@/hooks/useKeyboardDirections";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const containerStyles = css({
  position: "relative",
  display: "inline-block",
  width: "100%",
});

const inputRowStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
  p: "sm",
  border: "1px solid token(colors.border)",
  borderRadius: "sm",
  bg: "background",
  cursor: "pointer",
  transition: "border-color 0.15s",
  _focusWithin: {
    borderColor: "primary",
    boxShadow: "0 0 0 1px token(colors.primary)",
  },
});

const swatchStyles = css({
  w: "24px",
  h: "24px",
  borderRadius: "sm",
  border: "1px solid token(colors.border)",
  flexShrink: 0,
  cursor: "pointer",
});

const hexInputStyles = css({
  flex: 1,
  border: "none",
  bg: "transparent",
  color: "text",
  fontSize: "sm",
  fontFamily: "mono",
  outline: "none",
  _placeholder: {
    color: "text.muted",
  },
});

const panelStyles = css({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  mt: "xs",
  p: "md",
  bg: "background",
  border: "1px solid token(colors.border)",
  borderRadius: "sm",
  boxShadow: "lg",
  zIndex: 1,
});

const paletteStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "xs",
});

const paletteRowStyles = css({
  display: "grid",
  gridTemplateColumns: "repeat(9, 1fr)",
  gap: "xs",
});

const paletteSwatchStyles = css({
  w: "24px",
  h: "24px",
  borderRadius: "sm",
  cursor: "pointer",
  border: "2px solid transparent",
  transition: "transform 0.1s, border-color 0.1s",
  outline: "none",
  _hover: {
    transform: "scale(1.1)",
  },
  _focus: {
    boxShadow: "0 0 0 2px token(colors.primary)",
  },
});

const paletteSwatchSelectedStyles = css({
  borderColor: "text",
  transform: "scale(1.1)",
});

/** Number of columns in the color palette grid */
const PALETTE_COLS = 9;

const toggleStyles = css({
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.muted",
  cursor: "pointer",
  background: "none",
  border: "none",
  textAlign: "left",
  padding: 0,
  mt: "sm",
});

const pickerContainerStyles = css({
  "& .react-colorful": {
    w: "100%",
    h: "150px",
  },
  "& .react-colorful__saturation": {
    borderRadius: "sm",
  },
  "& .react-colorful__hue": {
    h: "12px",
    borderRadius: "sm",
    mt: "sm",
  },
  "& .react-colorful__pointer": {
    w: "16px",
    h: "16px",
  },
});

export type ColorInputProps = {
  /** Current color value (hex string) */
  value?: string | null;
  /** Called when color changes */
  onChange?: (color: string) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Label for accessibility */
  label?: string;
  /** Additional class name */
  className?: string;
};

/**
 * Compact color input with expandable picker panel.
 *
 * Displays a color swatch preview next to a hex input. When focused,
 * expands to show either a preset palette or custom color picker.
 * Toggles between palette and custom picker in the same UI area.
 * Defaults to custom picker if current value isn't a preset color.
 *
 * @example
 * ```tsx
 * <ColorInput
 *   value={zone.color}
 *   onChange={(color) => updateZone({ color })}
 *   label="Zone color"
 * />
 * ```
 */
export const ColorInput = forwardRef<HTMLDivElement, ColorInputProps>(
  function ColorInput(
    {
      value,
      onChange,
      placeholder = "#000000",
      disabled = false,
      label,
      className,
    },
    ref
  ) {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState(value ?? "");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const swatchRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const panelRef = useFocusTrap<HTMLDivElement>(isOpen);

    const currentColor = value ?? "#3B82F6";
    const isPresetColor = PRESET_COLORS.some(
      (c) => c.toUpperCase() === currentColor.toUpperCase()
    );

    // Default to custom picker if value is not a preset color
    const [showCustomPicker, setShowCustomPicker] = useState(!isPresetColor);

    // Sync input value with prop
    useEffect(() => {
      if (value !== undefined && value !== null) {
        setInputValue(value);
      }
    }, [value]);

    // Update showCustomPicker when value changes to non-preset color
    useEffect(() => {
      const isPreset = PRESET_COLORS.some(
        (c) => c.toUpperCase() === currentColor.toUpperCase()
      );
      if (!isPreset) {
        setShowCustomPicker(true);
      }
    }, [currentColor]);

    // Memoized click-outside handler to avoid recreating on every render
    // Uses PointerEvent for consistent behavior across mouse, touch, and pen
    const handleClickOutside = useCallback((e: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }, []);

    // Handle click outside to close panel
    // Using pointerdown instead of mousedown for better mobile/touch support
    useEffect(() => {
      if (!isOpen) return;

      document.addEventListener("pointerdown", handleClickOutside);
      return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, [isOpen, handleClickOutside]);

    // Reset focus index when panel closes
    useEffect(() => {
      if (!isOpen) {
        setFocusedIndex(-1);
      }
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;

      // Add # prefix if missing
      if (val && !val.startsWith("#")) {
        val = "#" + val;
      }

      setInputValue(val);

      // Only call onChange if it's a valid hex color
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        onChange?.(val);
      }
    };

    const handleInputBlur = () => {
      // Normalize to value on blur if input is invalid
      if (!/^#[0-9A-Fa-f]{6}$/.test(inputValue)) {
        setInputValue(value ?? "");
      }
    };

    const handlePickerChange = (color: string) => {
      setInputValue(color);
      onChange?.(color);
    };

    const handleSwatchClick = (color: string) => {
      setInputValue(color);
      onChange?.(color);
    };

    // Keyboard navigation for palette using reusable hook
    const totalColors = PRESET_COLORS.length;
    const rows = Math.ceil(totalColors / PALETTE_COLS);

    const moveFocus = (getNext: (prev: number) => number) => {
      setFocusedIndex((prev) => {
        const next = getNext(prev);
        swatchRefs.current[next]?.focus();
        return next;
      });
    };

    const handleKeyDown = useKeyboardDirections({
      onRight: isOpen && !showCustomPicker
        ? () => moveFocus((prev) => (prev < 0 ? 0 : (prev + 1) % totalColors))
        : undefined,
      onLeft: isOpen && !showCustomPicker
        ? () => moveFocus((prev) => (prev <= 0 ? totalColors - 1 : prev - 1))
        : undefined,
      onDown: isOpen && !showCustomPicker
        ? () =>
            moveFocus((prev) => {
              const currentRow = Math.floor((prev < 0 ? 0 : prev) / PALETTE_COLS);
              const currentCol = (prev < 0 ? 0 : prev) % PALETTE_COLS;
              const nextRow = (currentRow + 1) % rows;
              return Math.min(nextRow * PALETTE_COLS + currentCol, totalColors - 1);
            })
        : undefined,
      onUp: isOpen && !showCustomPicker
        ? () =>
            moveFocus((prev) => {
              const currentRow = Math.floor((prev < 0 ? 0 : prev) / PALETTE_COLS);
              const currentCol = (prev < 0 ? 0 : prev) % PALETTE_COLS;
              const nextRow = currentRow <= 0 ? rows - 1 : currentRow - 1;
              return Math.min(nextRow * PALETTE_COLS + currentCol, totalColors - 1);
            })
        : undefined,
      onSelect:
        isOpen && !showCustomPicker && focusedIndex >= 0 && focusedIndex < totalColors
          ? () => {
              const color = PRESET_COLORS[focusedIndex];
              if (color) {
                handleSwatchClick(color);
                setIsOpen(false);
              }
            }
          : undefined,
      onEscape: isOpen
        ? () => {
            setIsOpen(false);
            inputRef.current?.focus();
          }
        : undefined,
    });

    const handleFocus = () => {
      if (!disabled) {
        setIsOpen(true);
        // Select input value on focus for easy paste
        inputRef.current?.select();
      }
    };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={`${containerStyles} ${className ?? ""}`}
      >
        <div className={inputRowStyles}>
          <button
            type="button"
            className={swatchStyles}
            style={{ backgroundColor: currentColor }}
            onClick={handleFocus}
            aria-label="Open color picker"
            disabled={disabled}
          />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={hexInputStyles}
            aria-label={label ?? "Color hex value"}
            maxLength={7}
          />
        </div>

        {isOpen && !disabled && (
          <div ref={panelRef} className={panelStyles} onKeyDown={handleKeyDown}>
            {showCustomPicker ? (
              <div className={pickerContainerStyles}>
                <HexColorPicker
                  color={currentColor}
                  onChange={handlePickerChange}
                />
              </div>
            ) : (
              <div className={paletteStyles} role="grid" aria-label="Color palette">
                {PRESET_COLOR_ROWS.map((row, rowIndex) => (
                  <div key={rowIndex} className={paletteRowStyles} role="row">
                    {row.map((color, colIndex) => {
                      const flatIndex = rowIndex * PALETTE_COLS + colIndex;
                      return (
                        <button
                          key={color}
                          ref={(el) => {
                            swatchRefs.current[flatIndex] = el;
                          }}
                          type="button"
                          role="gridcell"
                          tabIndex={flatIndex === focusedIndex ? 0 : -1}
                          className={`${paletteSwatchStyles} ${
                            currentColor.toUpperCase() === color.toUpperCase()
                              ? paletteSwatchSelectedStyles
                              : ""
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleSwatchClick(color)}
                          onFocus={() => setFocusedIndex(flatIndex)}
                          aria-label={`Select color ${color}`}
                          aria-pressed={currentColor.toUpperCase() === color.toUpperCase()}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              className={toggleStyles}
              onClick={() => setShowCustomPicker(!showCustomPicker)}
            >
              {showCustomPicker ? "Show palette" : "Custom color..."}
            </button>
          </div>
        )}
      </div>
    );
  }
);
