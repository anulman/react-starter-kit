# React Starter Kit

An opinionated React starter for building production apps on **Cloudflare Workers**.

Extracted from a real production app. Battle-tested opinions, not a toy.

## Stack

- **[TanStack Start](https://tanstack.com/start)** — SSR framework with file-based routing
- **[Cloudflare Workers](https://workers.cloudflare.com)** — Edge deployment via `@cloudflare/vite-plugin`
- **[Panda CSS](https://panda-css.com)** — Zero-runtime CSS-in-JS with type-safe tokens
- **[BaseUI](https://base-ui.com)** — Headless component primitives (accessibility built-in)
- **[Bun](https://bun.sh)** — Runtime and package manager
- **[Vitest](https://vitest.dev)** — Testing

## Quick Start

```bash
# Use as GitHub template, then:
bun install
bun run dev          # http://localhost:3000
```

## What's Included

### Core (`src/`)

**15 UI components** — BaseUI primitives wrapped with Panda CSS:
- Forms: Button, Input, TextArea, Select, Checkbox
- Feedback: Modal, Dialog (Confirm/Alert), Toast, LoadingSpinner, Skeleton
- Data: Badge, EmptyState

**Layout utilities** — Panda CSS JSX: Flex, Grid, HStack, VStack, Box, Center

**Env management** — Type-safe client (`env.ts`) and server (`serverEnv.ts`) patterns for CF Workers

**Routing scaffold** — `__root.tsx` shell, API route example, protected route pattern

### Recipes (`recipes/`)

Opt-in integrations. Copy what you need into `src/`, install deps, follow the README.

| Recipe | What | Key deps |
|--------|------|----------|
| `auth/` | Twilio Verify + dual-token sessions + OtpInput | `twilio`, `jose`, `cookie-es` |
| `convex/` | Reactive DB + TanStack Query bridge | `convex`, `@convex-dev/react-query` |
| `markdown/` | TipTap editor + Markdown renderer | `@tiptap/*`, `react-markdown` |
| `posthog/` | Analytics (client + server) | `posthog-js`, `posthog-node` |
| `storybook/` | Component dev + story tests | `storybook`, `@storybook/react-vite` |
| `layout/` | Card, Section, Header, Sidebar, Main | (none) |
| `data-display/` | Table, List, Avatar, Timestamp | `date-fns` |
| `pickers/` | Color/Icon pickers | `react-colorful` |

## Opinions

Things this starter kit believes:

- `css()` / `cva()` only — never `styled()`
- `import * as ui from "@/components/ui"` — namespace imports
- z-index: only -1, 0, 1
- Never nest `<Button>` inside `<Link>`
- TanStack Router context > React Context (except imperative UI like toasts)
- Server env via `getServerEnv()`, never `process.env`
- Conventional commits
- No `any` without a comment

Read `CLAUDE.md` for the full conventions guide.

## Customizing

1. Update `package.json` name
2. Update `wrangler.jsonc` with your project name
3. Replace Panda CSS tokens in `panda.config.ts` with your design system
4. Delete recipes you don't need
5. Ship

## Commands

```bash
bun run dev          # Dev server
bun run build        # Production build
bun run test         # Tests
bun run typecheck    # Type checking
bun run deploy       # Build + deploy to CF Workers
bun run generate:css # Regenerate Panda CSS
```

## License

MIT
