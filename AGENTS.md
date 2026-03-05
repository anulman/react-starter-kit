# AGENTS.md — Agent Conventions

## Commits

Use **conventional commits**:
```
feat: add user profile page
fix: correct modal z-index on mobile
refactor: extract field styles to shared module
docs: update component API reference
test: add Button loading state tests
chore: update panda css to v1.9
```

## PR Workflow

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make changes, run checks:
   ```bash
   bun run typecheck
   bun run test -- --run
   ```
3. Commit with conventional commit message
4. Push and open PR

## Before Committing

- [ ] `bun run typecheck` passes
- [ ] `bun run test -- --run` passes
- [ ] No unused imports or dead code
- [ ] No `any` types without justification

## Component Creation Checklist

- [ ] File created in `src/components/ui/ComponentName.tsx`
- [ ] Uses `cva()` for variants, `css()` for static styles
- [ ] Wraps BaseUI primitive if interactive (Dialog, Select, etc.)
- [ ] Accepts `className` prop for composition
- [ ] Uses `forwardRef` for DOM elements
- [ ] Exported from `src/components/ui/index.ts`
- [ ] Types exported (`ComponentNameProps`)
- [ ] No `styled()` — only `css()`/`cva()`
- [ ] z-index values are only -1, 0, or 1

## Tool Recommendations

If available, use:
- **`qmd`** — quick file reading, faster than cat for exploring the codebase
- **`ast-grep`** — structural code search/refactoring (find all `cva()` usages, rename patterns, etc.)

## Sub-Agent Coordination

When splitting work across sub-agents:
- **One agent per feature/file group** — avoid two agents editing the same file
- **Barrel exports last** — the agent that creates the component should update `index.ts`
- **Tests alongside implementation** — don't defer tests to a separate agent
- **Share context via files** — write decisions to a scratch file if agents need to coordinate
