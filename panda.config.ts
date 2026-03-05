import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  preflight: true,
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: ["./src/lib/**"],
  jsxFramework: "react",
  outdir: "styled-system",

  // Dark mode via CSS class on <html> (toggled by src/lib/theme.ts)
  conditions: {
    dark: "[data-theme=dark] &",
  },

  theme: {
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
        "border.semantic": {
          value: { base: "{colors.border}", _dark: "#2a2a2a" },
        },
      },
    },
  },
});
