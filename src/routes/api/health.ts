/**
 * Health Check API Route
 *
 * Returns 200 with status. Add your own dependency checks here.
 */
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      async GET() {
        const response = {
          healthy: true,
          timestamp: Date.now(),
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
