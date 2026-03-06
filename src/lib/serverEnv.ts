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
 *   import { getServerEnv } from "@/lib/serverEnv";
 *
 *   const myServerFn = createServerFn().handler(async () => {
 *     const env = await getServerEnv();
 *     // env.DATABASE_URL, env.API_KEY, etc.
 *   });
 *
 * For client-side vars (VITE_*), use: import { env } from "@/lib/env"
 */
import { ENV } from "varlock/env";

export interface ServerEnvironment {
  // Add your server-side secrets here to match .env.schema, e.g.:
  // DATABASE_URL: string;
  // API_KEY: string;
}

/**
 * Get server-side environment variables.
 *
 * In Cloudflare Workers, falls back to worker bindings if varlock
 * env is not populated (e.g., during SSR request handling).
 */
export async function getServerEnv(): Promise<ServerEnvironment> {
  // Varlock auto-loads and validates from .env.schema.
  // In CF Workers, secrets bound via wrangler.jsonc are available
  // in the worker env -- varlock's vite integration handles bridging.
  return ENV as unknown as ServerEnvironment;
}
