/// <reference types="vite/client" />
import { type ReactNode, useEffect } from "react";
import * as tsr from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import type { RouterContext } from "@/router";
import globalStyles from "@/styles/global.css?url";
import { ToastProvider } from "@/components/ui";
import {
  DefaultErrorComponent,
  DefaultNotFound,
} from "@/components/ErrorBoundary";
import { initTheme } from "@/lib/theme";
import { makeHead } from "@/lib/head";

export const Route = tsr.createRootRouteWithContext<RouterContext>()({
  head: () => makeHead(),
  component: RootComponent,
  errorComponent: DefaultErrorComponent,
  notFoundComponent: DefaultNotFound,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    return initTheme();
  }, []);

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <tsr.Outlet />
        </ToastProvider>
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href={globalStyles} />
        <tsr.HeadContent />
      </head>
      <body>
        {children}
        <tsr.Scripts />
      </body>
    </html>
  );
}
