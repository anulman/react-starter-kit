/// <reference types="vite/client" />
import type { ReactNode } from "react";
import * as tsr from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import type { RouterContext } from "@/router";
import globalStyles from "@/styles/global.css?url";
import { ToastProvider } from "@/components/ui";

export const Route = tsr.createRootRouteWithContext<RouterContext>()({
  head() {
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "My App" },
      ],
      links: [{ rel: "stylesheet", href: globalStyles }],
    };
  },
  component: RootComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

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
        <tsr.HeadContent />
      </head>
      <body>
        {children}
        <tsr.Scripts />
      </body>
    </html>
  );
}
