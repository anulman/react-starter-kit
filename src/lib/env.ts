/**
 * Client-side environment variables.
 *
 * Environment validation is handled entirely by varlock via `.env.schema`.
 * Do not add manual validation wrappers. Use `import.meta.env.VITE_*` directly.
 *
 * For server-side secrets, use: import { ENV } from "@/lib/serverEnv"
 */

export const isProduction = import.meta.env.PROD;
export const isDevelopment = import.meta.env.DEV;
