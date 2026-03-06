# Recipe Install Skill

Installs a recipe from the `recipes/` directory into the active project.

## When to Use

When asked to add auth, forms, authoring/markdown, Convex, PostHog analytics, or Storybook to the project.

## Available Recipes

| Recipe | Directory | Extra Dependencies |
|--------|-----------|-------------------|
| Auth (OTP + sessions) | `recipes/auth/` | `twilio` (or your SMS/email provider) |
| Forms | `recipes/forms/` | None (zod + @tanstack/react-form already included) |
| Authoring (Markdown + rich text) | `recipes/authoring/` | `react-markdown`, `remark-gfm`, `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-placeholder` |
| Convex | `recipes/convex/` | `convex`, `@convex-dev/react-query` |
| Analytics (PostHog) | `recipes/analytics/` | `posthog-js`, `posthog-node` |
| Storybook | `recipes/storybook/` | `storybook`, `@storybook/react-vite`, `@storybook/addon-a11y`, `@storybook/test` |

## Process

### 1. Read the Recipe README

Always read `recipes/{name}/README.md` first. It contains:
- What the recipe provides
- Required dependencies
- Integration instructions
- Usage examples

### 2. Install Dependencies

```bash
bun add {runtime-deps}
bun add -D {dev-deps}
```

### 3. Copy Files

Copy recipe files into the appropriate location in `src/`. Recommended structure:

| Recipe | Target Location |
|--------|----------------|
| Auth | `src/features/auth/` |
| Forms | Follow pattern in README (no files to copy, just a pattern) |
| Authoring | `src/features/authoring/` |
| Convex | `convex/` (project root) + `src/lib/convex.ts` |
| Analytics | `src/lib/analytics.ts` + provider in `__root.tsx` |
| Storybook | `.storybook/` (project root) |

### 4. Wire Up

Each recipe has specific integration points. Common patterns:

- **Providers**: Add to `__root.tsx` inside `<RootComponent>`
- **Middleware**: Import in server functions via `.middleware([authMiddleware])`
- **Route guards**: Add `beforeLoad` to layout routes
- **Head tags**: Add analytics scripts via `makeHead()` links

### 5. Verify

- Run `bun run typecheck` -- no type errors from new code
- Run `bun run dev` -- recipe renders/functions correctly
- Run `bun run test` -- existing tests still pass

## Rules

- **Don't modify recipe source files in `recipes/`** -- copy them to `src/`, then modify the copies
- **Recipes are starting points** -- adapt them to your specific needs after copying
- **Check for conflicts** -- some recipes add providers to `__root.tsx`; make sure nesting order is correct (auth outside data, data outside UI)
- **Update `.env.schema`** with any new environment variables the recipe requires
- **Update `CLAUDE.md`** if the recipe introduces new conventions or patterns
