# Route Scaffold Skill

Generates new TanStack Start routes with proper patterns for loaders, head metadata, error handling, and server functions.

## When to Use

When asked to create a new page or API route.

## Route Types

### Page Route

Create `src/routes/_app/{path}.tsx`:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { makeHead } from "@/lib/head";

export const Route = createFileRoute("/_app/{path}")({
  head: () => makeHead({
    title: "{Page Title}",
    description: "{Page description for SEO}",
  }),
  component: {PageName},
});

function {PageName}() {
  return (
    <div className={css({ p: "md" })}>
      <h1>{Page Title}</h1>
    </div>
  );
}
```

### Page with Loader

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { makeHead } from "@/lib/head";

const fetchData = createServerFn({ method: "GET" })
  .handler(async () => {
    // Server-side data fetching
    return { items: [] };
  });

export const Route = createFileRoute("/_app/{path}")({
  head: () => makeHead({ title: "{Page Title}" }),
  loader: () => fetchData(),
  component: {PageName},
});

function {PageName}() {
  const data = Route.useLoaderData();
  return <div>{/* render data */}</div>;
}
```

### Protected Route (Layout)

For routes requiring authentication, create a layout route:

```tsx
// src/routes/_authed.tsx
import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
  async beforeLoad({ context }) {
    if (!context.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
});
```

Then nest pages under `src/routes/_authed/`.

### API Route

Create `src/routes/api/{name}.ts`:

```tsx
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/{name}")({
  GET: async ({ request }) => {
    return Response.json({ ok: true });
  },
  POST: async ({ request }) => {
    const body = await request.json();
    return Response.json({ received: body });
  },
});
```

### Page with Typed Search Params

Use Zod to validate and type search parameters:

```tsx
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { makeHead } from "@/lib/head";

const searchSchema = z.object({
  q: z.string().optional(),
  page: z.number().default(1),
});

export const Route = createFileRoute("/_app/search")({
  validateSearch: searchSchema,
  head: () => makeHead({ title: "Search" }),
  component: SearchPage,
});

function SearchPage() {
  const { q, page } = Route.useSearch();
  return (
    <div>
      <p>Query: {q ?? "none"}, Page: {page}</p>
    </div>
  );
}
```

## Rules

- **Always use `makeHead()`** for page routes -- never raw meta arrays
- **Server functions for data fetching** -- never fetch in components directly
- **Server-only imports via dynamic `import()`** in `beforeLoad`/`loader`:
  ```tsx
  // Server: dynamic import to avoid bundling in client
  if (typeof window === "undefined") {
    const { getRequestHeader } = await import("@tanstack/react-start/server");
  }
  ```
- **Don't use `process.env`** in server functions -- use `ENV` from `@/lib/serverEnv`
- **Layout routes (`_name.tsx`) don't render pages** -- they render `<Outlet />`
- **Pathless layout routes** group related pages without adding URL segments
- **Error handling**: Route-level `errorComponent` overrides the global default from `ErrorBoundary.tsx`

## After Creating

1. Run `bun run dev` -- TanStack Router auto-generates the route tree
2. Verify the route renders at the expected URL
3. Check that `makeHead()` metadata appears in the `<head>`
