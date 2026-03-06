# Contributing

## Local Setup

```bash
bun install        # Install deps + generate styled-system/ + route tree
bun run dev        # Dev server on http://localhost:3000
```

Requires [Bun](https://bun.sh) v1.3+.

## Adding Components

Follow the component scaffold skill: read `skills/component-scaffold/SKILL.md` before creating new UI components. The pattern is: BaseUI primitive → Panda CSS `cva()` recipe → typed props → export from barrel.

## Running Tests

```bash
bun run test             # Unit tests (watch mode)
bun run test -- --run    # Unit tests (single run)
bun run test:e2e         # E2E tests (Playwright)
bun run typecheck        # TypeScript check
```

> **Note:** E2E coverage is still being expanded. Add E2E tests for new user-facing features before promoting to production.

## Commits

Use [conventional commits](https://www.conventionalcommits.org/):

```
feat: add user profile page
fix: resolve modal focus trap on close
docs: update deployment guide
test: add ConfirmDialog error recovery test
```

## Pull Request Workflow

1. Create a feature branch from `main`
2. Make your changes with tests
3. Run `bun run typecheck && bun run test -- --run` locally
4. Open a PR — CI must pass (typecheck, unit tests, build, E2E)
5. Get review and merge

## Environment Variables

Environment validation is handled by [varlock](https://varlock.dev) via `.env.schema`. Add `@required`, `@type`, `@sensitive` decorators to define your schema. Varlock validates on load and fails fast with clear errors. Do not add manual validation wrappers around env access.
