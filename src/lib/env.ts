/**
 * Client-side environment variables.
 *
 * For VITE_* prefixed variables safe to expose to the browser.
 * Schema and validation defined in .env.schema (via varlock).
 *
 * For server-side secrets, use: import { getServerEnv } from "@/lib/serverEnv"
 */

interface ClientEnvironment {
  /** App name */
  VITE_APP_NAME: string;
  /** App base URL */
  VITE_APP_URL: string;
}

function validateClientEnv(): ClientEnvironment {
  const viteEnv = import.meta.env;

  return {
    VITE_APP_NAME: viteEnv.VITE_APP_NAME || "My App",
    VITE_APP_URL:
      viteEnv.VITE_APP_URL ||
      (viteEnv.DEV ? "http://localhost:3000" : ""),
  };
}

/** Client-side environment variables -- safe to use anywhere. */
export const env = validateClientEnv();

export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;
