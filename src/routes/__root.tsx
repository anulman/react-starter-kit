/// <reference types="vite/client" />
import type { ReactNode } from "react";
import { Outlet, ScrollRestoration, createRootRoute } from "@tanstack/react-router";
import { ToastProvider } from "@/components/ui";

export const Route = createRootRoute({
  head() {
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "React Starter Kit" },
      ],
    };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <ToastProvider>
        <Outlet />
      </ToastProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        {children}
        <ScrollRestoration />
      </body>
    </html>
  );
}
