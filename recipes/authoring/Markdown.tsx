import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { css } from "styled-system/css";

const proseStyles = css({
  color: "text",
  lineHeight: "relaxed",
  "& h1": { fontSize: "2xl", fontWeight: "bold", marginTop: "lg", marginBottom: "sm", lineHeight: "tight" },
  "& h2": { fontSize: "xl", fontWeight: "semibold", marginTop: "lg", marginBottom: "sm", lineHeight: "tight" },
  "& h3": { fontSize: "lg", fontWeight: "semibold", marginTop: "md", marginBottom: "xs", lineHeight: "tight" },
  "& h4, & h5, & h6": { fontSize: "md", fontWeight: "semibold", marginTop: "md", marginBottom: "xs" },
  "& p": { marginTop: "sm", marginBottom: "sm" },
  "& ul, & ol": { marginTop: "sm", marginBottom: "sm", paddingLeft: "lg" },
  "& ul": { listStyleType: "disc" },
  "& ol": { listStyleType: "decimal" },
  "& li": { marginTop: "xs", marginBottom: "xs" },
  "& a": { color: "primary", textDecoration: "underline", _hover: { color: "primary.hover" } },
  "& code": { fontFamily: "mono", fontSize: "sm", bg: "surface", px: "xs", borderRadius: "sm" },
  "& pre": { bg: "surface", p: "md", borderRadius: "sm", overflow: "auto", marginTop: "sm", marginBottom: "sm", "& code": { bg: "transparent", p: "0" } },
  "& blockquote": { borderLeft: "4px solid token(colors.border)", pl: "md", color: "text.muted", fontStyle: "italic", marginTop: "sm", marginBottom: "sm" },
  "& hr": { border: "none", borderTop: "1px solid token(colors.border)", marginTop: "md", marginBottom: "md" },
  "& table": { width: "100%", borderCollapse: "collapse", marginTop: "sm", marginBottom: "sm", fontSize: "sm" },
  "& th, & td": { border: "1px solid token(colors.border)", px: "md", py: "sm", textAlign: "left" },
  "& th": { fontWeight: "semibold", bg: "surface" },
  "& strong": { fontWeight: "semibold" },
  "& em": { fontStyle: "italic" },
  "& img": { maxWidth: "100%", height: "auto", borderRadius: "sm" },
});

export type MarkdownProps = {
  content: string;
  className?: string;
};

export function Markdown({ content, className }: MarkdownProps) {
  return (
    <div className={proseStyles + (className ? ` ${className}` : "")}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
