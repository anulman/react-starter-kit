import { createRouter } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";
import {
  DefaultErrorComponent,
  DefaultNotFound,
} from "@/components/ErrorBoundary";

export interface RouterContext {
  queryClient: QueryClient;
}

export async function getRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60, // 1 minute
      },
    },
  });

  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultErrorComponent,
    defaultNotFoundComponent: DefaultNotFound,
    context: {
      queryClient,
    },
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: Awaited<ReturnType<typeof getRouter>>;
  }
}
