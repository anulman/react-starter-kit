/**
 * Server-side environment variables
 *
 * ONLY USE IN SERVER FUNCTIONS — accesses Cloudflare worker bindings
 * which are only available during request handling, not at module load time.
 *
 * Usage:
 *   const myServerFn = createServerFn().handler(async () => {
 *     const { MY_SECRET } = await getServerEnv();
 *     // ...
 *   });
 *
 * For client-side vars (VITE_*), use:
 *   import { env } from "@/lib/env"
 *
 * NOTE: cloudflare:workers import is lazy to avoid breaking Node.js (Vitest).
 */

export interface ServerEnvironment {
  // Add your server-side secrets here:
  // MY_API_KEY: string;
  // DATABASE_URL: string;
}

type EnvWithSecrets = Env & Partial<ServerEnvironment>;

let cachedEnv: EnvWithSecrets | null = null;

function isNodeEnvironment(): boolean {
  return (
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null
  );
}

async function getEnv(): Promise<EnvWithSecrets> {
  if (!cachedEnv) {
    if (isNodeEnvironment()) {
      cachedEnv = process.env as unknown as EnvWithSecrets;
    } else {
      const { env } = await import("cloudflare:workers");
      cachedEnv = env as EnvWithSecrets;
    }
  }
  return cachedEnv;
}

/**
 * Get server-side environment variables from Cloudflare worker bindings.
 *
 * MUST be called inside a request handler (createServerFn, API route, loader, etc.)
 * Will throw if called at module load time or if required vars are missing.
 */
export async function getServerEnv(): Promise<ServerEnvironment> {
  const env = await getEnv();

  // Add your required server vars here:
  // const required = ["MY_API_KEY", "DATABASE_URL"] as const;
  // const missing = required.filter((key) => !env[key]);
  // if (missing.length > 0) {
  //   throw new Error(
  //     `Missing required server env vars: ${missing.join(", ")}\n` +
  //     `Local: set in .dev.vars\n` +
  //     `Prod: set in Cloudflare dashboard → Workers → Settings → Variables`
  //   );
  // }

  return {
    // MY_API_KEY: env.MY_API_KEY!,
  };
}
