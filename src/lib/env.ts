/**
 * Client-side environment variable access
 *
 * VITE_* prefixed variables are safe to expose to the browser.
 *
 * For server-side secrets, use:
 *   import { getServerEnv } from "@/lib/serverEnv"
 *
 * Server env must be accessed inside request handlers, not at module load time,
 * because Cloudflare Workers don't have process.env — they use worker bindings.
 */

interface ClientEnvironment {
  /** App base URL */
  VITE_APP_URL: string;
  // Add your VITE_* variables here
}

function validateClientEnv(): ClientEnvironment {
  const viteEnv = import.meta.env;

  return {
    VITE_APP_URL:
      viteEnv.VITE_APP_URL ||
      (viteEnv.DEV ? "http://localhost:3000" : "https://your-app.workers.dev"),
  };
}

/** Client-side environment variables. Safe to use anywhere. */
export const env = validateClientEnv();

export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;
