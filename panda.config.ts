import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Enable CSS reset
  preflight: true,

  // Files to scan for Panda CSS usage
  include: ["./src/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude - lib files don't contain Panda styles and
  // have module-level code that accesses import.meta.env
  exclude: ["./src/lib/**"],

  // React JSX framework
  jsxFramework: "react",

  // Output directory for generated files
  outdir: "styled-system",

  // Minimal theme with ~20 tokens
  theme: {
    tokens: {
      // Colors (~8 tokens)
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

      // Spacing (~6 tokens)
      spacing: {
        xs: { value: "0.25rem" },
        sm: { value: "0.5rem" },
        md: { value: "1rem" },
        lg: { value: "1.5rem" },
        xl: { value: "2rem" },
        "2xl": { value: "3rem" },
      },

      // Typography
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

      // Radii
      radii: {
        sm: { value: "4px" },
        md: { value: "8px" },
        lg: { value: "12px" },
        full: { value: "9999px" },
      },

      // Shadows
      shadows: {
        sm: { value: "0 1px 2px rgba(0, 0, 0, 0.05)" },
        md: { value: "0 2px 8px rgba(0, 0, 0, 0.1)" },
        lg: { value: "0 4px 16px rgba(0, 0, 0, 0.15)" },
      },
    },

    // Breakpoints (mobile-first) - defined at theme level, not in tokens
    breakpoints: {
      sm: "640px", // Small phones landscape
      md: "768px", // Tablets
      lg: "1024px", // Laptops
      xl: "1280px", // Desktops
      "2xl": "1536px", // Large screens
    },

    // Semantic tokens for future dark mode support
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: "{colors.background}" },
          surface: { value: "{colors.surface}" },
        },
        fg: {
          DEFAULT: { value: "{colors.text}" },
          muted: { value: "{colors.text.muted}" },
        },
      },
    },
  },
});
