# CLAUDE.md — AI Development Guide

## Project Overview

React starter kit built on **TanStack Start** deployed to **Cloudflare Workers**. Uses **Panda CSS** for near-zero-runtime styling and **BaseUI** for accessible headless components.

**Stack**: Bun · TanStack Start · React 19 · Panda CSS · BaseUI · Vitest · Cloudflare Workers

## Quick Reference

```bash
bun install              # Install deps + generate styled-system/ + route tree
bun run dev              # Dev server on :3000
bun run build            # Production build
bun run test             # Run tests (Vitest)
bun run typecheck        # TypeScript check
bun run deploy           # Deploy to Cloudflare Workers
```

### File Locations

| What | Where |
|------|-------|
| UI components | `src/components/ui/` |
| Layout utilities | `src/components/layout/` |
| Icons | `src/components/icons/` |
| Routes | `src/routes/` |
| Client env | `import.meta.env.VITE_*` (validated by `.env.schema`) |
| Server env | `src/lib/serverEnv.ts` (re-exports varlock `ENV`) |
| Theme tokens | `panda.config.ts` |
| Global CSS | `src/styles/global.css` |
| Drop-in recipes | `recipes/` |

### Tool Recommendations

If available, use `qmd` for quick file reading and `ast-grep` for structural code search/refactoring. These are particularly useful for navigating the component library and finding usage patterns.

---

## Architecture Decisions

### Why TanStack Start + Cloudflare Workers
SSR on the edge. File-based routing with type-safe params. Server functions that colocate with components. Cloudflare Workers for global distribution with smart placement.

### Why Panda CSS (not Tailwind)
- **Near-zero-runtime** — styles generated at build time, with minimal JS for class name resolution
- **Type-safe tokens** — typos are compile errors, not silent bugs
- **`cva()` recipes** — variant API for components, cleaner than className concatenation
- Same DX as Tailwind (utility-first) but with type safety

### Why BaseUI (not Radix/Headless UI)
- Truly headless — zero default styles to fight
- Accessible primitives (Dialog, Select, Checkbox, AlertDialog)
- We wrap them with Panda CSS `cva()` recipes

### Why `css()`/`cva()` only — no `styled()`
- `styled()` creates wrapper components that obscure the DOM
- `css()` and `cva()` produce classNames — predictable, debuggable, composable
- One pattern across the whole codebase

### z-index: only -1, 0, 1
No z-index wars. Three values:
- `-1`: Behind content (decorative)
- `0`: Default
- `1`: Above content (modals, dropdowns, toasts, fixed headers)

Stacking within the same z-index is controlled by DOM order.

### Namespace imports for UI
```tsx
import * as ui from "@/components/ui";
<ui.Button variant="primary">Save</ui.Button>
```
Clear provenance. No naming conflicts. Easy to grep.

### Server env via varlock `ENV`
Cloudflare Workers don't have `process.env`. Worker bindings are request-scoped. `ENV` from varlock (re-exported via `@/lib/serverEnv`) provides validated, type-safe access.

---

## Component Creation Guide

### Adding a new UI component

1. **Create the file** in `src/components/ui/YourComponent.tsx`
2. **Use `cva()` for variants**, `css()` for static styles:

```tsx
import { cva, type RecipeVariantProps } from "styled-system/css";

const myRecipe = cva({
  base: {
    display: "flex",
    borderRadius: "sm",
  },
  variants: {
    size: {
      sm: { px: "sm", py: "xs", fontSize: "sm" },
      md: { px: "md", py: "sm", fontSize: "md" },
    },
    variant: {
      primary: { bg: "primary", color: "white" },
      secondary: { bg: "surface", color: "text" },
    },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

type MyVariants = RecipeVariantProps<typeof myRecipe>;
```

3. **Wrap BaseUI if applicable** (for interactive components):
```tsx
import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
```

4. **Export from barrel** — add to `src/components/ui/index.ts`
5. **Accept `className` prop** for composition
6. **Accept `ref` as a regular prop** (React 19 — no `forwardRef` needed)

### Adding a new icon

Follow the pattern in `src/components/icons/CheckIcon.tsx`:
```tsx
import type { SVGProps } from "react";

export type MyIconProps = SVGProps<SVGSVGElement> & { size?: number };

export function MyIcon({ size = 16, ...props }: MyIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" {...props}>
      {/* paths */}
    </svg>
  );
}
```

Export from `src/components/icons/index.ts`.

---

## Styling Patterns

### Static styles
```tsx
import { css } from "styled-system/css";

const titleStyles = css({
  fontSize: "lg",
  fontWeight: "semibold",
  color: "text",
});
```

### Variant recipes
```tsx
import { cva } from "styled-system/css";

const buttonRecipe = cva({
  base: { /* shared styles */ },
  variants: {
    variant: { primary: { bg: "primary" }, ghost: { bg: "transparent" } },
    size: { sm: { px: "sm" }, md: { px: "md" } },
  },
  defaultVariants: { variant: "primary", size: "md" },
});

// Usage: className={buttonRecipe({ variant: "ghost", size: "sm" })}
```

### Responsive breakpoints (mobile-first)
```tsx
const styles = css({
  fontSize: { base: "sm", md: "md", lg: "lg" },
  display: { base: "none", md: "flex" },
});
```

Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px).

### Layout components
```tsx
import { Flex, HStack, VStack, Grid, Box, Center } from "@/components/layout";

<HStack gap="md">
  <Box flex="1">Content</Box>
  <Box>Sidebar</Box>
</HStack>
```

These are Panda CSS JSX components — they accept all style props directly.

---

## Route Patterns

### Root route (`__root.tsx`)
HTML shell, global providers (QueryClient, ToastProvider), global styles.

### Layout routes (pathless)
`_app.tsx` wraps all app pages. Use for shared header/sidebar/footer.
For protected routes, create `_authed.tsx` with a `beforeLoad` redirect:

```tsx
export const Route = createFileRoute("/_authed")({
  beforeLoad({ context }) {
    if (!context.session?.user) {
      throw redirect({ to: "/login" });
    }
  },
  component: AuthedLayout,
});
```

### Server-only imports in routes
Use dynamic imports in `beforeLoad`/`loader` to avoid bundling server code into the client:
```tsx
beforeLoad: async () => {
  const { ENV } = await import("@/lib/serverEnv");
  const apiKey = ENV.API_KEY;
}
```

### API routes

> **Note:** When `createAPIFileRoute` from `@tanstack/react-start/api` becomes available,
> migrate API routes to use it instead of the `server.handlers` pattern below.

```tsx
export const Route = createFileRoute("/api/my-endpoint")({
  server: {
    handlers: {
      async GET() { return new Response(JSON.stringify({ ok: true })); },
      async POST({ request }) { /* ... */ },
    },
  },
});
```

---

## Environment Variables

> **Environment validation is handled by varlock via `.env.schema`.** The included schema
> is scaffolded — expand for your project. Add `@required`, `@type`, `@sensitive` decorators
> to define your schema. Varlock validates on load and fails fast with clear errors.

### Client-side (`VITE_*`)
```tsx
// Use import.meta.env directly — varlock validates on load
const appName = import.meta.env.VITE_APP_NAME;
```
Set in `wrangler.jsonc` `vars` or `.env` locally. Bundled into client JS — **never put secrets here**.

> **Do not add manual validation wrappers.** Environment validation is handled entirely by varlock via `.env.schema`.

### Server-side (secrets)
```tsx
import { ENV } from "@/lib/serverEnv";

// Access validated env vars directly
const apiKey = ENV.API_KEY;
```
Set via `bunx wrangler secret put` or `.dev.vars` locally. Never accessible from client.

---

## Testing

### Running tests
```bash
bun run test              # Watch mode
bun run test -- --run     # Single run
```

### Component test pattern
```tsx
// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
  });
});
```

Use `@vitest-environment happy-dom` directive for TSX tests that need a DOM.

---

## Deployment

```bash
bun run build     # Build for production
bun run deploy    # Deploy to Cloudflare Workers
```

See `docs/deployment.md` for custom domains, secrets, and smart placement.

---

## Recipes

The `recipes/` directory contains drop-in patterns:

- **auth/** — OTP verification + dual-token sessions
- **authoring/** — Markdown rendering + TipTap rich text editor
- **convex/** — Convex real-time database integration
- **analytics/** — PostHog scaffolding
- **storybook/** — Storybook configuration

Each recipe has its own README with setup instructions and required dependencies.

---

## Anti-Patterns

❌ **No nested interactive elements** — never put `<Button>` inside `<Link>` or `<a>` inside `<button>`
❌ **No `styled()` API** — use `css()` and `cva()` only
❌ **No arbitrary z-index** — only `-1`, `0`, `1`
❌ **No `process.env` in Workers** — use `ENV` from `@/lib/serverEnv` for server secrets, `import.meta.env` for client vars
❌ **No `any` types** — unless justified with a comment explaining why
❌ **No server imports at module level in routes** — use dynamic `import()` in `beforeLoad`/`loader`

---

## Agent Skills

Reusable instructions for common tasks. Read the relevant SKILL.md before executing.

| Skill | Location | When to Use |
|-------|----------|-------------|
| **Component Scaffold** | `skills/component-scaffold/SKILL.md` | Creating a new UI component |
| **Storybook Generation** | `skills/storybook-gen/SKILL.md` | Adding/updating component stories |
| **Route Scaffold** | `skills/route-scaffold/SKILL.md` | Creating a new page or API route |
| **Recipe Install** | `skills/recipe-install/SKILL.md` | Adding auth, forms, Convex, PostHog, etc. |

Read the skill file before acting. Follow its conventions exactly.
