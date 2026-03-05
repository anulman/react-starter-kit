/**
 * ColorPicker Component
 *
 * Full-featured color picker with preset palette and custom color selection.
 *
 * Uses `react-colorful` (https://github.com/omgovich/react-colorful) for the
 * custom color picker. This library was chosen for its:
 * - Zero dependencies and small bundle size (~2KB)
 * - Accessible and keyboard navigable
 * - CSS-in-JS styling support (we override styles via Panda CSS)
 */

import { useState, forwardRef } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";
import { css } from "styled-system/css";
import { PRESET_COLORS, PRESET_COLOR_ROWS } from "@/lib/colors";

// Re-export for backwards compatibility
export { PRESET_COLORS, PRESET_COLOR_ROWS } from "@/lib/colors";

const containerStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "md",
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

const swatchStyles = css({
  w: "24px",
  h: "24px",
  borderRadius: "sm",
  cursor: "pointer",
  border: "2px solid transparent",
  transition: "transform 0.1s, border-color 0.1s",
  _hover: {
    transform: "scale(1.1)",
  },
});

const swatchSelectedStyles = css({
  borderColor: "text",
  transform: "scale(1.1)",
});

const customSectionStyles = css({
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  pt: "sm",
  borderTop: "1px solid token(colors.border)",
});

const customLabelStyles = css({
  fontSize: "xs",
  fontWeight: "medium",
  color: "text.muted",
});

const customInputRowStyles = css({
  display: "flex",
  alignItems: "center",
  gap: "sm",
});

const hexInputStyles = css({
  flex: 1,
  px: "sm",
  py: "xs",
  fontSize: "sm",
  fontFamily: "mono",
  border: "1px solid token(colors.border)",
  borderRadius: "sm",
  bg: "background",
  color: "text",
  _focus: {
    outline: "none",
    borderColor: "primary",
  },
});

const previewSwatchStyles = css({
  w: "32px",
  h: "32px",
  borderRadius: "sm",
  border: "1px solid token(colors.border)",
  flexShrink: 0,
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

export type ColorPickerProps = {
  /** Current color value (hex string) */
  value?: string | null;
  /** Called when color changes */
  onChange?: (color: string) => void;
  /** Whether to show the full color picker (default: just palette) */
  showPicker?: boolean;
  /** Additional class name */
  className?: string;
};

/**
 * Color selection component with preset palette and optional custom picker.
 *
 * Displays a grid of 27 preset colors (9 hues × 3 shades). Users can toggle
 * a custom color picker for arbitrary hex color selection.
 *
 * @example
 * ```tsx
 * <ColorPicker
 *   value={zone.color}
 *   onChange={(color) => updateZone({ color })}
 * />
 * ```
 */
export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  function ColorPicker(
    { value, onChange, showPicker = false, className },
    ref
  ) {
    const [showCustom, setShowCustom] = useState(showPicker);
    const currentColor = value ?? "#3B82F6";

    const handleSwatchClick = (color: string) => {
      onChange?.(color);
    };

    const isPresetColor = PRESET_COLORS.some(
      (c) => c.toUpperCase() === currentColor.toUpperCase()
    );

    return (
      <div ref={ref} className={`${containerStyles} ${className ?? ""}`}>
        {/* Preset Palette - organized by saturation rows */}
        <div className={paletteStyles}>
          {PRESET_COLOR_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className={paletteRowStyles}>
              {row.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`${swatchStyles} ${
                    currentColor.toUpperCase() === color.toUpperCase()
                      ? swatchSelectedStyles
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleSwatchClick(color)}
                  aria-label={`Select color ${color}`}
                  aria-pressed={currentColor.toUpperCase() === color.toUpperCase()}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Custom Color Section */}
        <div className={customSectionStyles}>
          <button
            type="button"
            className={customLabelStyles}
            onClick={() => setShowCustom(!showCustom)}
            style={{ cursor: "pointer", background: "none", border: "none", textAlign: "left", padding: 0 }}
          >
            {showCustom ? "Hide custom picker" : "Custom color..."}
          </button>

          {showCustom && (
            <>
              <div className={pickerContainerStyles}>
                <HexColorPicker
                  color={currentColor}
                  onChange={(color) => onChange?.(color)}
                />
              </div>
              <div className={customInputRowStyles}>
                <span
                  className={previewSwatchStyles}
                  style={{ backgroundColor: currentColor }}
                  aria-hidden="true"
                />
                <HexColorInput
                  color={currentColor}
                  onChange={(color) => onChange?.(color)}
                  prefixed
                  className={hexInputStyles}
                  aria-label="Hex color value"
                />
              </div>
            </>
          )}

          {!showCustom && !isPresetColor && (
            <div className={customInputRowStyles}>
              <span
                className={previewSwatchStyles}
                style={{ backgroundColor: currentColor }}
                aria-hidden="true"
              />
              <span className={css({ fontSize: "sm", color: "text.muted" })}>
                {currentColor}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
