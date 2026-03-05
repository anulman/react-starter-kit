# Architecture Decisions

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | TanStack Start | Full-stack React with SSR, file-based routing, server functions |
| Runtime | Bun | Fast package management, TypeScript-native |
| Styling | Panda CSS | Zero-runtime, type-safe tokens, `cva()` recipes |
| Components | BaseUI | Headless accessible primitives, styled with Panda CSS |
| Deployment | Cloudflare Workers | Edge SSR, global distribution, smart placement |
| Testing | Vitest | Fast, Vite-native, compatible with happy-dom |

## Key Decisions

### Panda CSS over Tailwind
- Zero-runtime CSS generation (no runtime JS for styles)
- Type-safe design tokens — typos are compile errors
- `cva()` recipes for component variants — cleaner than className concatenation
- `css()` for one-off styles — similar DX to Tailwind but type-checked

### BaseUI over Radix/Headless UI
- Truly headless — zero default styles to override
- Accessible primitives (Dialog, Select, Checkbox, etc.)
- Wrap with Panda CSS `cva()` for consistent design system

### `css()`/`cva()` only — no `styled()`
- `styled()` creates wrapper components that obscure the DOM
- `css()` and `cva()` are just classNames — predictable, debuggable
- Consistent pattern across the entire codebase

### z-index: only -1, 0, 1
- No z-index wars. Three values handle all cases:
  - `-1`: Behind content (decorative elements)
  - `0`: Default stacking
  - `1`: Above content (modals, dropdowns, toasts)
- Stacking is controlled by DOM order within the same z-index level

### Namespace imports for UI
```tsx
import * as ui from "@/components/ui";
<ui.Button variant="primary">Save</ui.Button>
```
- Clear provenance — you always know where a component comes from
- No naming conflicts with domain components
- Easy to grep for UI component usage

### Server env via `getServerEnv()` — not `process.env`
- Cloudflare Workers don't have `process.env`
- Worker bindings are request-scoped, accessed via `cloudflare:workers`
- `getServerEnv()` abstracts this, works in both Workers and Node.js (tests)

### Session computed once at router mount
- Session is stable for the page session — no mid-navigation auth flickers
- Auth-changing operations use hard navigation (`window.location.href`)
- This ensures a fresh session is computed on the next page load
