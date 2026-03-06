import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  // lib/ excluded intentionally — utility modules should not contain css()/cva() calls.
  // If you need styles in a lib file, move it to components/ or add the path here.
  exclude: ["./src/lib/**"],
  jsxFramework: "react",
  outdir: "styled-system",

  // Dark mode via CSS class on <html> (toggled by src/lib/theme.ts)
  conditions: {
    dark: "[data-theme=dark] &",
  },

  theme: {
    extend: {
      keyframes: {
        slideIn: {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
    tokens: {
      colors: {
        background: { value: "#ffffff" },
        surface: { value: "#f5f5f5" },
        border: { value: "#e0e0e0" },
        text: {
          DEFAULT: { value: "#1a1a1a" },
          muted: { value: "#666666" },
          faded: { value: "#666666aa" },
        },
        primary: {
          DEFAULT: { value: "#007bff" },
          hover: { value: "#0056b3" },
        },
        success: { value: "#28a745" },
        warning: { value: "#ffc107" },
        danger: { value: "#dc3545" },
      },
      spacing: {
        xs: { value: "0.25rem" },
        sm: { value: "0.5rem" },
        md: { value: "1rem" },
        lg: { value: "1.5rem" },
        xl: { value: "2rem" },
        "2xl": { value: "3rem" },
      },
      fonts: {
        body: {
          value:
            "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
        mono: {
          value: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace",
        },
      },
      fontSizes: {
        xs: { value: "0.75rem" },
        sm: { value: "0.875rem" },
        md: { value: "1rem" },
        lg: { value: "1.25rem" },
        xl: { value: "1.5rem" },
        "2xl": { value: "2rem" },
      },
      fontWeights: {
        normal: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
      },
      lineHeights: {
        tight: { value: "1.25" },
        normal: { value: "1.5" },
        relaxed: { value: "1.75" },
      },
      radii: {
        sm: { value: "4px" },
        md: { value: "8px" },
        lg: { value: "12px" },
        full: { value: "9999px" },
      },
      shadows: {
        sm: { value: "0 1px 2px rgba(0, 0, 0, 0.05)" },
        md: { value: "0 2px 8px rgba(0, 0, 0, 0.1)" },
        lg: { value: "0 4px 16px rgba(0, 0, 0, 0.15)" },
      },
    },
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    // Semantic tokens: adaptive colors that change between light and dark mode.
    // bg, fg, stroke — layout colors (always adaptive)
    // primary, success, warning, danger — status colors (adaptive, slightly brighter in dark mode)
    // text.faded — de-emphasized text (adaptive, avoids hex+alpha for dark mode compatibility)
    // Raw tokens (background, surface, border, text.*, etc.) stay constant and are used as base values.
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: {
            value: { base: "{colors.background}", _dark: "#0a0a0a" },
          },
          surface: {
            value: { base: "{colors.surface}", _dark: "#1a1a1a" },
          },
        },
        fg: {
          DEFAULT: {
            value: { base: "{colors.text}", _dark: "#e5e5e5" },
          },
          muted: {
            value: { base: "{colors.text.muted}", _dark: "#a0a0a0" },
          },
        },
        stroke: {
          value: { base: "{colors.border}", _dark: "#2a2a2a" },
        },
        // Interactive / status colors — adjusted for dark backgrounds
        primary: {
          DEFAULT: {
            value: { base: "{colors.primary}", _dark: "#3b9eff" },
          },
          hover: {
            value: { base: "{colors.primary.hover}", _dark: "#66b3ff" },
          },
        },
        success: {
          value: { base: "{colors.success}", _dark: "#34d058" },
        },
        warning: {
          value: { base: "{colors.warning}", _dark: "#ffd33d" },
        },
        danger: {
          value: { base: "{colors.danger}", _dark: "#f85149" },
        },
        "text.faded": {
          value: { base: "{colors.text.faded}", _dark: "#808080" },
        },
        overlay: {
          value: { base: "rgba(0, 0, 0, 0.5)", _dark: "rgba(0, 0, 0, 0.7)" },
        },
      },
    },
  },
});
