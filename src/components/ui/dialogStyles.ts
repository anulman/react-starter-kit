import { css } from "styled-system/css";

export const backdropStyles = css({
  position: "fixed",
  inset: 0,
  bg: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
});

export const alertPopupStyles = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bg: "bg",
  borderRadius: "md",
  boxShadow: "lg",
  p: "lg",
  minWidth: { base: "auto", sm: "360px" },
  maxWidth: "400px",
  width: "90vw",
  zIndex: 1,
});

export const modalPopupStyles = css({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bg: "bg",
  borderRadius: "md",
  boxShadow: "lg",
  p: "lg",
  width: { base: "90vw", sm: "auto" },
  minWidth: { base: "auto", sm: "400px", md: "720px" },
  maxWidth: "90vw",
  maxHeight: "90vh",
  overflow: "auto",
  zIndex: 1,
});

export const titleStyles = css({
  fontSize: "lg",
  fontWeight: "semibold",
  color: "fg",
  marginBottom: "xs",
});

export const descriptionStyles = css({
  fontSize: "md",
  color: "fg.muted",
  marginBottom: "md",
});

export const alertDescriptionStyles = css({
  fontSize: "md",
  color: "fg.muted",
  marginBottom: "lg",
});

export const actionsStyles = css({
  display: "flex",
  justifyContent: "flex-end",
  gap: "sm",
});
