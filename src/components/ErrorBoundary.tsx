/**
 * Default error and not-found components for TanStack Router.
 *
 * Usage in routes:
 *   export const Route = createFileRoute("/example")({
 *     errorComponent: DefaultErrorComponent,
 *     notFoundComponent: DefaultNotFound,
 *   });
 *
 * Or set globally in router config:
 *   createRouter({
 *     routeTree,
 *     defaultErrorComponent: DefaultErrorComponent,
 *     defaultNotFoundComponent: DefaultNotFound,
 *   });
 */
import { useRouter, type ErrorComponentProps } from "@tanstack/react-router";
import { css } from "styled-system/css";
import * as ui from "@/components/ui";

const containerStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "50dvh",
  p: "xl",
  textAlign: "center",
});

const titleStyles = css({
  fontSize: "2xl",
  fontWeight: "bold",
  color: "text",
  mb: "sm",
});

const messageStyles = css({
  fontSize: "md",
  color: "text.muted",
  mb: "lg",
  maxWidth: "480px",
  lineHeight: "relaxed",
});

const codeStyles = css({
  fontFamily: "mono",
  fontSize: "sm",
  color: "danger",
  bg: "surface",
  p: "md",
  borderRadius: "md",
  maxWidth: "600px",
  width: "100%",
  overflow: "auto",
  textAlign: "left",
  mb: "lg",
});

export function DefaultErrorComponent({ error, reset }: ErrorComponentProps) {
  const isDev = import.meta.env.DEV;

  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>Something went wrong</h1>
      <p className={messageStyles}>
        An unexpected error occurred. You can try again, or go back to the home
        page.
      </p>
      {isDev && error instanceof Error && (
        <pre className={codeStyles}>
          {error.message}
          {error.stack && `\n\n${error.stack}`}
        </pre>
      )}
      <ui.Button onClick={reset} variant="primary">
        Try again
      </ui.Button>
    </div>
  );
}

export function DefaultNotFound() {
  const router = useRouter();

  return (
    <div className={containerStyles}>
      <h1 className={titleStyles}>Page not found</h1>
      <p className={messageStyles}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <ui.Button onClick={() => router.navigate({ to: "/" })} variant="primary">
        Go home
      </ui.Button>
    </div>
  );
}
