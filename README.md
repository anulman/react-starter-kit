# React Starter Kit

> 🏗️ **GitHub Template Repo** — Use this as a template when creating new projects.

An opinionated React starter kit extracted from a production app. Ships with a design system, edge deployment, and drop-in recipes for common patterns.

## Stack

- **[TanStack Start](https://tanstack.com/start)** — Full-stack React with SSR, file-based routing, server functions
- **[Panda CSS](https://panda-css.com)** — Zero-runtime, type-safe styling with `cva()` recipes
- **[BaseUI](https://base-ui.com)** — Accessible headless components
- **[Cloudflare Workers](https://workers.cloudflare.com)** — Edge SSR with smart placement
- **[Bun](https://bun.sh)** — Runtime and package manager
- **[Vitest](https://vitest.dev)** — Testing framework

## Getting Started

```bash
# Clone or use as template
bun install          # Installs deps + generates styled-system/ and route tree
bun run dev          # Start dev server on http://localhost:3000
```

## What's Included

### Core (`src/`)
- **15 UI components** — Button, Input, TextArea, Select, Checkbox, Modal, ConfirmDialog, AlertDialog, ToastProvider, LoadingSpinner, Skeleton, Badge, EmptyState
- **Layout utilities** — Flex, Grid, HStack, VStack, Box, Center (via Panda CSS)
- **7 icons** — CheckIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, PlusIcon, MenuIcon, SettingsIcon
- **Environment helpers** — Client (`env.ts`) and server (`serverEnv.ts`) with Workers compatibility
- **API routes** — Health check and liveness probe

### Recipes (`recipes/`)
Drop-in patterns with their own READMEs:
- **auth/** — OTP verification + dual-token sessions
- **authoring/** — Markdown rendering + TipTap rich text editor
- **convex/** — Convex real-time database integration
- **analytics/** — PostHog scaffolding
- **storybook/** — Storybook configuration

## Commands

```bash
bun run dev          # Dev server
bun run build        # Production build
bun run test         # Run tests
bun run typecheck    # TypeScript check
bun run deploy       # Deploy to Cloudflare Workers
```

## Docs

- [Architecture Decisions](docs/architecture.md)
- [Component API Reference](docs/components.md)
- [Deployment Guide](docs/deployment.md)
- [AI Development Guide](CLAUDE.md)

## License

MIT
