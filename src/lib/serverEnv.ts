/**
 * Server-side environment variables
 *
 * ONLY USE IN SERVER FUNCTIONS — accesses Cloudflare worker bindings
 * which are only available during request handling, not at module load time.
 *
 * Usage:
 *   const myServerFn = createServerFn().handler(async () => {
 *     const { MY_SECRET } = await getServerEnv();
 *   });
 *
 * For client-side vars (VITE_*), use: import { env } from "@/lib/env"
 */

export interface ServerEnvironment {
  // Add your server-side secrets here, e.g.:
  // DATABASE_URL: string;
  // API_KEY: string;
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
 * MUST be called inside a request handler.
 */
export async function getServerEnv(): Promise<ServerEnvironment> {
  const env = await getEnv();

  // Validate required vars here:
  // const required = ["DATABASE_URL", "API_KEY"] as const;
  // const missing = required.filter((key) => !env[key]);
  // if (missing.length > 0) {
  //   throw new Error(`Missing server env vars: ${missing.join(", ")}`);
  // }

  return {
    // DATABASE_URL: env.DATABASE_URL!,
    // API_KEY: env.API_KEY!,
  };
}
