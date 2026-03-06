/**
 * Liveness Probe — returns 204 No Content for uptime monitoring.
 */
// TODO: Migrate to createAPIFileRoute from "@tanstack/react-start/api" when available.
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/liveness")({
  server: {
    handlers: {
      HEAD() {
        return new Response(null, { status: 204 });
      },
      GET() {
        return new Response(null, { status: 204 });
      },
    },
  },
});
