# Authoring Recipe: Markdown Rendering + Rich Text Editing

## Files

- `Markdown.tsx` — Renders markdown content with Panda CSS prose styles
- `MarkdownEditor.tsx` — TipTap-based rich text editor (adapt sync to your backend)

## Dependencies

```bash
bun add react-markdown remark-gfm
# For editor:
bun add @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder
```

## Usage

```tsx
import { Markdown } from "@/components/ui/Markdown";
import { MarkdownEditor } from "@/components/ui/MarkdownEditor";

// Render markdown
<Markdown content="# Hello\n\nSome **bold** text" />

// Rich text editor
<MarkdownEditor
  content={content}
  onChange={setContent}
  placeholder="Start writing..."
/>
```
