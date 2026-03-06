/**
 * Health Check API Route
 *
 * Returns 200 with status. Add your own dependency checks here.
 */
// TODO: Migrate to createAPIFileRoute from "@tanstack/react-start/api" when available.
// See: https://tanstack.com/router/latest/docs/framework/react/start/api-routes
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      async GET() {
        const response = {
          healthy: true,
          timestamp: Date.now(),
          // Add service health checks here, e.g.:
          // database: await db.ping().then(() => "ok").catch(() => "error"),
          // cache: await redis.ping().then(() => "ok").catch(() => "error"),
          services: {},
        };

        return new Response(JSON.stringify(response, null, 2), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
