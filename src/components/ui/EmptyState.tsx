import type { ReactNode } from "react";
import { css, cx } from "styled-system/css";

const containerStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  py: "2xl",
  px: "md",
});

const iconContainerStyles = css({ color: "fg.muted", marginBottom: "md" });
const titleStyles = css({ fontSize: "lg", fontWeight: "semibold", color: "fg", marginBottom: "xs" });
const descriptionStyles = css({ fontSize: "md", color: "fg.muted", maxWidth: "400px", marginBottom: "md" });

export type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cx(containerStyles, className)}>
      {icon && <div className={iconContainerStyles}>{icon}</div>}
      <h3 className={titleStyles}>{title}</h3>
      {description && <p className={descriptionStyles}>{description}</p>}
      {action}
    </div>
  );
}
