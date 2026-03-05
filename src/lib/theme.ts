/**
 * Theme (dark mode) management.
 *
 * Uses `data-theme` attribute on <html> and syncs with:
 * 1. localStorage ("theme" key)
 * 2. System preference via `prefers-color-scheme` media query
 *
 * Usage:
 *   import { initTheme, toggleTheme, getTheme, onThemeChange } from "@/lib/theme";
 *
 *   // Call once on app mount (already wired in __root.tsx)
 *   initTheme();
 *
 *   // Toggle or set explicitly
 *   toggleTheme();
 *   setTheme("dark");
 *
 *   // React to changes
 *   const cleanup = onThemeChange((theme) => console.log(theme));
 */

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const ATTR = "data-theme";

let currentTheme: Theme = "light";
const listeners = new Set<(theme: Theme) => void>();

/** Get the system's preferred color scheme. */
function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/** Apply theme to the document and notify listeners. */
function apply(theme: Theme) {
  currentTheme = theme;
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute(ATTR, theme);
  }
  listeners.forEach((fn) => fn(theme));
}

/**
 * Initialize theme from localStorage or system preference.
 * Registers a media query listener to react to OS-level changes.
 * Call once at app startup.
 */
export function initTheme(): () => void {
  if (typeof window === "undefined") return () => {};

  // Resolve initial theme: stored preference > system preference
  const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
  apply(stored || getSystemTheme());

  // Listen for system preference changes
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e: MediaQueryListEvent) => {
    // Only follow system if user hasn't set an explicit preference
    if (!localStorage.getItem(STORAGE_KEY)) {
      apply(e.matches ? "dark" : "light");
    }
  };
  mql.addEventListener("change", handler);

  return () => mql.removeEventListener("change", handler);
}

/** Get the current theme. */
export function getTheme(): Theme {
  return currentTheme;
}

/** Set theme explicitly and persist to localStorage. */
export function setTheme(theme: Theme) {
  localStorage.setItem(STORAGE_KEY, theme);
  apply(theme);
}

/** Toggle between light and dark, persisting the choice. */
export function toggleTheme() {
  setTheme(currentTheme === "light" ? "dark" : "light");
}

/** Clear stored preference and follow system theme. */
export function resetTheme() {
  localStorage.removeItem(STORAGE_KEY);
  apply(getSystemTheme());
}

/** Subscribe to theme changes. Returns cleanup function. */
export function onThemeChange(fn: (theme: Theme) => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
