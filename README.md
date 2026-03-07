# React Starter Kit

An opinionated template for building React apps on Cloudflare Workers. TanStack Start for SSR, Panda CSS for styling, BaseUI for accessible primitives, Bun for everything.

> **This is a GitHub template repo.** Click "Use this template" to create a new project, or clone it directly.

## Quick Start

```bash
# From GitHub template
gh repo create my-app --template anulman/react-starter-kit --clone
cd my-app

# Or clone directly
git clone https://github.com/anulman/react-starter-kit.git my-app
cd my-app
rm -rf .git && git init

# Install + codegen (Panda CSS generates styled-system/ automatically)
bun install

# Start dev server on http://localhost:3000
bun run dev
```

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| **Framework** | [TanStack Start](https://tanstack.com/start) | File-based routing, SSR, server functions |
| **Runtime** | [Bun](https://bun.sh) | Fast installs, native TypeScript |
| **Styling** | [Panda CSS](https://panda-css.com) | Near-zero-runtime — styles generated at build time, with minimal JS for class name resolution |
| **Components** | [BaseUI](https://base-ui.com) | Headless accessible primitives |
| **Deployment** | [Cloudflare Workers](https://workers.cloudflare.com) | Edge SSR via `@cloudflare/vite-plugin` |
| **Testing** | [Vitest](https://vitest.dev) | Vite-native, fast |
| **Storybook** | [Storybook 10](https://storybook.js.org) | Component explorer with a11y addon |

## What's Included

### 24 Core Components

All follow the same pattern: BaseUI primitive → Panda CSS `cva()` recipe → typed props → `ref` as a regular prop (React 19).

```tsx
import * as ui from "@/components/ui";

// Buttons with variants
<ui.Button variant="primary" size="md" loading={isSubmitting}>
  Save
</ui.Button>

// Form inputs
<ui.Input type="email" placeholder="you@example.com" />
<ui.TextArea rows={4} placeholder="Write something..." />
<ui.Select
  options={[
    { label: "Option A", value: "a" },
    { label: "Option B", value: "b" },
  ]}
  value={selected}
  onChange={setSelected}
/>
<ui.Checkbox checked={agreed} onChange={setAgreed}>
  I agree to the terms
</ui.Checkbox>

// Dialogs
<ui.Modal open={isOpen} onClose={() => setIsOpen(false)} title="Edit Item">
  <p>Modal content here</p>
</ui.Modal>

<ui.ConfirmDialog
  open={showConfirm}
  onConfirm={handleDelete}
  onCancel={() => setShowConfirm(false)}
  title="Delete item?"
  confirmLabel="Delete"
  variant="danger"
/>

// Feedback
<ui.LoadingSpinner size="md" />
<ui.Skeleton width="100%" height="20px" />
<ui.Badge variant="success">Active</ui.Badge>
<ui.EmptyState
  title="No items yet"
  description="Create your first item to get started."
/>
```

**Toasts** via provider + hook:

```tsx
// ToastProvider is already in __root.tsx
import { useToast } from "@/components/ui";

function MyComponent() {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await save();
      toast({ message: "Saved!", variant: "success" });
    } catch {
      toast({ message: "Something went wrong", variant: "error" });
    }
  };
}
```

### Layout Utilities

Re-exported from Panda CSS JSX  --  composable flex/grid primitives:

```tsx
import { Flex, Grid, HStack, VStack, Box, Center } from "@/components/layout";

<Flex gap="md" align="center" justify="space-between">
  <HStack gap="sm">
    <ui.Badge>New</ui.Badge>
    <span>Item title</span>
  </HStack>
  <ui.Button size="sm" variant="ghost">Edit</ui.Button>
</Flex>

<Grid columns={{ base: 1, md: 2, lg: 3 }} gap="md">
  {items.map(item => <Card key={item.id} {...item} />)}
</Grid>
```

### Route Patterns

```
src/routes/
├── __root.tsx          # HTML shell, providers (QueryClient, ToastProvider)
├── _app.tsx            # Layout route (add header/sidebar here)
├── _app/
│   └── index.tsx       # Landing page (/)
└── api/
    ├── health.ts       # GET /api/health
    └── liveness.ts     # GET /api/liveness
```

**Adding a protected layout route:**

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

// src/routes/_authed/dashboard.tsx -> /dashboard (protected)
```

**Server functions:**

```tsx
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getItems = createServerFn({ method: "GET" })
  .handler(async () => {
    // Runs on the server (CF Worker)
    // Access server env via ENV from varlock, NOT process.env
    const { API_KEY } = ENV;
    return fetch("https://api.example.com/items", {
      headers: { Authorization: `Bearer ${API_KEY}` },
    }).then(r => r.json());
  });
```

### Storybook

Storybook 10 is pre-configured with Panda CSS support and the a11y addon. The config filters out TanStack Start and Cloudflare plugins that don't apply in the Storybook context.

```bash
bun run storybook  # Opens on http://localhost:6006
```

Add stories next to your components:

```tsx
// src/components/ui/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  component: Button,
  args: { children: "Click me" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Loading: Story = { args: { loading: true } };
```

For deployment options (CF Pages, subdirectory), see `recipes/storybook-deploy/`.

### Environment Variables

Environment validation is handled by [varlock](https://varlock.dev) via `.env.schema`. The included schema is scaffolded — expand for your project. Add `@required`, `@type`, `@sensitive` decorators to define your schema. Varlock validates on load and fails fast with clear errors.

```tsx
// Client-side (must be prefixed with VITE_)
// Use import.meta.env directly — varlock validates on load via .env.schema
const appName = import.meta.env.VITE_APP_NAME;

// Server-side (inside request handlers only  --  not at module top level)
import { ENV } from "@/lib/serverEnv";
const { SECRET_KEY } = ENV;
```

For local dev, create `.dev.vars`:
```
SECRET_KEY=dev-secret
API_TOKEN=dev-token
```

## Recipes

Self-contained patterns in `recipes/` you can copy into your project when needed. Each has its own README with setup instructions.

### `recipes/auth/`  --  OTP Authentication

Passwordless auth with verification codes (email/SMS). Dual-token session pattern: long-lived session cookie (3 months) + short-lived JWT (5 minutes).

```tsx
// After copying recipe files into src/:
import { OtpInput } from "@/features/auth/OtpInput";
import { authMiddleware } from "@/features/auth/middleware";

// OTP input with auto-advance and paste support
<OtpInput
  length={6}
  onComplete={(code) => verify(code)}
/>

// Protect server functions with auth middleware
export const getProfile = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const user = context.user; // guaranteed by middleware
    return db.getUser(user.id);
  });
```

**Includes:** OtpInput component, session management (Lucia Auth-inspired), auth middleware, JWKS endpoint pattern.

### `recipes/authoring/`  --  Rich Text & Markdown

Markdown rendering and TipTap-based rich text editing.

```tsx
import { Markdown } from "@/features/authoring/Markdown";
import { MarkdownEditor } from "@/features/authoring/MarkdownEditor";

// Render markdown content
<Markdown content={post.body} />

// Rich text editor with toolbar
<MarkdownEditor
  initialContent={draft}
  onChange={(markdown) => saveDraft(markdown)}
  placeholder="Start writing..."
/>
```

**Extra deps:** `react-markdown`, `remark-gfm`, `@tiptap/react`, `@tiptap/starter-kit`

### `recipes/convex/`  --  Real-time Database

[Convex](https://convex.dev) integration with TanStack Query bridge for unified caching + real-time subscriptions.

```tsx
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";

// Reactive query  --  auto-updates when data changes
const { data: items } = useQuery(
  convexQuery(api.items.list, { projectId })
);

// Conditional subscription
const { data: details } = useQuery({
  ...convexQuery(api.items.get, { itemId }),
  enabled: isExpanded,
});
```

**Extra deps:** `convex`, `@convex-dev/react-query`

### `recipes/analytics/`  --  PostHog

Client + server PostHog setup with page tracking and feature flags.

```tsx
import { usePostHog } from "@/features/analytics/posthog";

function CheckoutButton() {
  const posthog = usePostHog();

  return (
    <ui.Button onClick={() => {
      posthog.capture("checkout_started", { items: cart.length });
    }}>
      Checkout
    </ui.Button>
  );
}
```

**Extra deps:** `posthog-js`, `posthog-node`

## Commands

```bash
bun run dev              # Start dev server (port 3000)
bun run build            # Production build
bun run preview          # Preview production build locally
bun run test             # Run tests (Vitest)
bun run typecheck        # TypeScript check
bun run storybook        # Storybook dev server (port 6006)
bun run build:storybook  # Build static Storybook
bun run deploy           # Deploy to Cloudflare Workers
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── ui/           # Design system (Button, Input, Modal, etc.)
│   │   ├── layout/       # Flex, Grid, HStack, VStack, Box, Center
│   │   └── icons/        # Minimal icon set (7 icons)
│   ├── lib/
│   │   ├── env.ts        # Client env flags (isProduction, isDevelopment)
│   │   └── serverEnv.ts  # Server env (re-exports varlock ENV)
│   ├── routes/           # File-based routing (TanStack Start)
│   ├── styles/
│   │   └── global.css    # Global styles + Panda CSS layers
│   ├── router.ts         # Router config + context type
│   ├── start.ts          # SSR entry
│   └── client.tsx        # Client entry
├── .storybook/           # Storybook config (pre-wired for Panda CSS + BaseUI)
├── recipes/              # Opt-in patterns (auth, markdown, convex, etc.)
├── docs/                 # Architecture decisions, component API, deployment
├── styled-system/        # Generated by Panda CSS (gitignored)
├── panda.config.ts       # Design tokens + theme
├── vite.config.ts        # TanStack Start + CF Workers + React
├── wrangler.jsonc        # Cloudflare Workers config
├── CLAUDE.md             # AI development guide
└── AGENTS.md             # Agent conventions
```

## Styling

Uses Panda CSS with ~20 design tokens. Two APIs:

```tsx
import { css, cva } from "styled-system/css";

// One-off styles
const header = css({
  p: "md",
  bg: "surface",
  borderBottom: "1px solid token(colors.border)",
});

// Component recipes with variants
const cardRecipe = cva({
  base: { borderRadius: "md", border: "1px solid token(colors.border)" },
  variants: {
    elevated: {
      true: { boxShadow: "sm" },
      false: { boxShadow: "none" },
    },
  },
  defaultVariants: { elevated: false },
});
```

**Rules:**
- `css()` / `cva()` only  --  no `styled()` API
- z-index: only `-1`, `0`, or `1`  --  never arbitrary values
- Mobile-first responsive: `{ base: "sm", md: "md", lg: "lg" }`
- Never nest `<Button>` inside `<Link>` (invalid HTML)

## AI-Assisted Development

This template includes `CLAUDE.md` and `AGENTS.md` for AI coding agents. If you use [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Codex](https://openai.com/codex), or similar tools, they'll pick up the project conventions automatically.

**Recommended tools:**
- [`qmd`](https://github.com/qmd-org/qmd)  --  fast file reading for large codebases
- [`ast-grep`](https://ast-grep.github.io)  --  structural code search and refactoring

## License

MIT
