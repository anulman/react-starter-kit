/**
 * Server-side environment variables.
 *
 * Uses varlock for validation, type safety, and log redaction.
 * Schema defined in .env.schema at project root.
 *
 * ONLY USE IN SERVER FUNCTIONS -- accesses Cloudflare worker bindings
 * which are only available during request handling, not at module load time.
 *
 * Usage:
 *   import { ENV } from "@/lib/serverEnv";
 *
 *   const myServerFn = createServerFn().handler(async () => {
 *     // ENV.DATABASE_URL, ENV.API_KEY, etc.
 *   });
 *
 * For client-side vars (VITE_*), use `import.meta.env.VITE_*` directly
 */
import { ENV } from "varlock/env";

export { ENV };
export type ServerEnvironment = typeof ENV;
