# Markdown Recipe

Rich text editing with TipTap + collaborative sync + Markdown rendering.

## What's Included

- `components/MarkdownEditor.tsx` — TipTap-based rich text editor
- `components/Markdown.tsx` — Markdown renderer (react-markdown + remark-gfm)
- Collaborative sync pattern via Convex ProseMirror (optional)

## Additional Dependencies

```bash
bun add @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder react-markdown remark-gfm
# For collaborative sync:
bun add @convex-dev/prosemirror-sync
```

## Key Patterns

- **Client-only rendering**: MarkdownEditor skips SSR (avoids sessionStorage issues)
- **Document ID convention**: `{entity}:{id}:{field}` (e.g., `zone:abc123:description`)
- **Auto-create on first edit**: Documents are lazily created
- **Markdown subset**: Headings, lists, code, links, emphasis

## Integration

1. Copy components into your preferred location (e.g., `src/components/markdown/`)
2. Install dependencies
3. Import and use — no provider setup needed for standalone mode
4. For collaborative sync, set up Convex ProseMirror (see HomeHub's `convex/prosemirrorSync.ts`)
