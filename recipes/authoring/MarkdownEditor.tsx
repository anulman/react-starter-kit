/**
 * TipTap Rich Text Editor
 *
 * Client-only component. Adapt the sync mechanism to your backend.
 * The original version uses @convex-dev/prosemirror-sync — replace with
 * your own persistence layer.
 */
import { forwardRef, useEffect, useState, type ComponentProps } from "react";
import { css } from "styled-system/css";
import { Skeleton } from "@/components/ui";

const editorStyles = css({
  cursor: "text",
  _focusWithin: {
    outline: "none",
    boxShadow: "0 0 0 2px color-mix(in srgb, token(colors.primary) 20%, transparent)",
    borderRadius: "sm",
  },
  "& .ProseMirror": {
    outline: "none",
    color: "text",
    lineHeight: "relaxed",
    minHeight: "80px",
    padding: "sm",
    "& p.is-editor-empty:first-child::before": {
      color: "text.muted",
      content: "attr(data-placeholder)",
      float: "left",
      height: 0,
      pointerEvents: "none",
    },
  },
  "& h1": { fontSize: "2xl", fontWeight: "bold", marginTop: "lg", marginBottom: "sm" },
  "& h2": { fontSize: "xl", fontWeight: "semibold", marginTop: "lg", marginBottom: "sm" },
  "& h3": { fontSize: "lg", fontWeight: "semibold", marginTop: "md", marginBottom: "xs" },
  "& p": { marginTop: "sm", marginBottom: "sm" },
  "& ul, & ol": { marginTop: "sm", marginBottom: "sm", paddingLeft: "lg" },
  "& ul": { listStyleType: "disc" },
  "& ol": { listStyleType: "decimal" },
  "& a": { color: "primary", textDecoration: "underline" },
  "& code": { fontFamily: "mono", fontSize: "sm", bg: "surface", px: "xs", borderRadius: "sm" },
  "& pre": { bg: "surface", p: "md", borderRadius: "sm", overflow: "auto", "& code": { bg: "transparent", p: "0" } },
  "& blockquote": { borderLeft: "4px solid token(colors.border)", pl: "md", color: "text.muted", fontStyle: "italic" },
  "& strong": { fontWeight: "semibold" },
  "& em": { fontStyle: "italic" },
});

export type MarkdownEditorProps = Omit<ComponentProps<"div">, "children"> & {
  content?: string;
  onChange?: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const MarkdownEditor = forwardRef<HTMLDivElement, MarkdownEditorProps>(
  function MarkdownEditor(
    { content, onChange, placeholder = "Start writing...", disabled = false, className, ...props },
    ref
  ) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => { setIsClient(true); }, []);

    if (!isClient) {
      return <Skeleton variant="rectangular" height={80} />;
    }

    // Dynamic import pattern for TipTap (client-only)
    // Replace with your actual TipTap setup:
    //
    // import { useEditor, EditorContent } from "@tiptap/react";
    // import StarterKit from "@tiptap/starter-kit";
    // import Placeholder from "@tiptap/extension-placeholder";
    //
    // const editor = useEditor({
    //   extensions: [StarterKit, Placeholder.configure({ placeholder })],
    //   content,
    //   editable: !disabled,
    //   onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    // });

    return (
      <div ref={ref} className={`${editorStyles} ${className ?? ""}`} {...props}>
        <div style={{ padding: "0.5rem", color: "#666" }}>
          TipTap editor placeholder — install @tiptap/react to activate
        </div>
      </div>
    );
  }
);
