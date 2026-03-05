# CLAUDE.md — React Starter Kit

## What This Is

An opinionated React starter kit for building production apps on **Cloudflare Workers**. Extracted from a real production app (HomeHub). TanStack Start + Panda CSS + BaseUI + Bun.

## Architecture

```
src/
├── components/
│   ├── ui/          # Design system (BaseUI + Panda CSS wrappers)
│   ├── layout/      # Flex, Grid, HStack, VStack, Box, Center
│   └── icons/       # SVG icon components (16x16 default, `size` prop)
├── lib/
│   ├── env.ts       # Client env (VITE_ prefix)
│   └── serverEnv.ts # Server env (accessed inside request handlers only)
├── routes/
│   ├── __root.tsx    # HTML shell, providers
│   ├── index.tsx     # Landing page
│   └── api/          # Server endpoints
├── styles/           # Global CSS if needed
├── start.ts          # TanStack Start entry
└── router.ts         # Router config + context

recipes/                # Opt-in integrations (copy what you need)
├── auth/              # Twilio Verify + dual-token sessions + OtpInput component
├── convex/            # Convex setup, TanStack Query bridge, schema patterns
├── markdown/          # TipTap + MarkdownEditor component
├── posthog/           # Analytics scaffolding (client + server)
└── storybook/         # Storybook config + story patterns
```

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | TanStack Start | File-based routing, SSR, server functions |
| Runtime | Bun | Fast, TypeScript-native |
| Deployment | Cloudflare Workers | Edge SSR via `@cloudflare/vite-plugin` |
| Styling | Panda CSS | Zero-runtime, type-safe tokens, atomic CSS |
| Components | BaseUI (headless) | Accessibility built-in, styled with Panda |
| Testing | Vitest | Fast, Vite-native |

## Key Conventions

### Styling
- **`css()` / `cva()` only** — never use `styled()`
- **Panda CSS tokens** for all values (colors, spacing, radii, fonts)
- **`cva()` recipes** for component variants (size, variant, state)
- **Mobile-first** responsive: `{ base: "sm", md: "md", lg: "lg" }`
- **z-index: only -1, 0, 1** — never arbitrary values (50, 100, etc.)
- **8-digit hex for alpha** — not `rgba()`

### Components
- **Namespace import**: `import * as ui from "@/components/ui"`
- **BaseUI primitive → Panda CSS wrapper** for every component
- **`forwardRef` with named functions**: `forwardRef(function Button(...))`
- **Never nest interactive elements**: no `<Button>` inside `<Link>`
  - Style `<Link>` as button with `css()`, or use `navigate()` in `onClick`
- **Export from barrel**: `src/components/ui/index.ts`

### Routing
- `__root.tsx` = HTML shell + providers (no layout)
- Layout routes (`_authed.tsx`) = authenticated shell, sidebar, etc.
- **TanStack Router context > React Context** for navigation-scoped data
- **React Context only for imperative UI** (toasts, modals)
- **Dynamic imports for server-only code** in `beforeLoad`/`loader`:
  ```typescript
  if (typeof window === "undefined") {
    const { getRequestHeader } = await import("@tanstack/react-start/server");
  }
  ```

### Environment Variables
- **Client**: `VITE_` prefix, accessed via `src/lib/env.ts`
- **Server**: accessed via `getServerEnv()` inside request handlers — never at module level
- **CF Workers**: no `process.env` — use `.dev.vars` locally, Workers secrets in prod

### Code Quality
- **No `any` types** unless explicitly justified with a comment
- **All pure functions exported and tested**
- **Conventional commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`
- **`!important` requires a comment** explaining why

## Recipes

The `recipes/` directory contains opt-in integrations. To use one:

1. Read its `README.md` for what it provides
2. Copy the files into your `src/` tree
3. Install its additional dependencies (listed in README)
4. Follow the integration guide

Recipes are designed to be copied, not imported. They become your code.

## Development

```bash
bun install
bun run dev          # Start dev server (port 3000)
bun run build        # Production build
bun run test         # Run tests
bun run typecheck    # Type checking
bun run deploy       # Build + deploy to CF Workers
```

## Tools

### Recommended for AI-assisted development
- **qmd** — if available, use for fast codebase context gathering
- **ast-grep** — if available, use for structural search/replace across the codebase
  - Prefer ast-grep over regex for refactoring (type-aware, respects AST boundaries)
  - Example: `sg -p 'styled($COMP)' --lang tsx` to find anti-pattern usage

### Planning Strategy
When making changes:
1. Read this file + relevant recipe READMEs first
2. Check `docs/` for architecture decisions
3. Plan before coding — write the approach in a comment or PR description
4. Small, atomic commits (one concern per commit)
5. Run `bun run typecheck && bun run test` before pushing

### Documentation Strategy
- Architecture decisions → `docs/decisions/` (ADR format)
- Component API → Storybook stories (if recipe installed)
- Integration patterns → recipe READMEs
- Keep CLAUDE.md updated when conventions change
