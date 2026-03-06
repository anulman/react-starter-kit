/**
 * Client-side environment variables.
 *
 * For VITE_* prefixed variables safe to expose to the browser.
 * Schema and validation defined in .env.schema (via varlock).
 *
 * For server-side secrets, use: import { ENV } from "@/lib/serverEnv"
 */

/** Client-side environment variables -- safe to use anywhere. */
export const env = {
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || "My App",
  VITE_APP_URL:
    import.meta.env.VITE_APP_URL ||
    (import.meta.env.DEV ? "http://localhost:3000" : ""),
};

export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;
