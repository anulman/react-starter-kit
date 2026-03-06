/**
 * TanStack Start configuration.
 *
 * This is the entry point for server-level setup: middleware chains,
 * session handling, request context injection, etc.
 *
 * Example: adding auth middleware
 *   import { authMiddleware } from "@/lib/auth";
 *   export const startInstance = createStart(() => ({
 *     middleware: [authMiddleware],
 *   }));
 */
import { createStart } from "@tanstack/react-start";

export const startInstance = createStart(() => ({}));
