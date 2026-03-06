import { css } from "styled-system/css";

/**
 * z-index note: Both backdrop and popup use zIndex: 1. Stacking is controlled
 * by DOM order (backdrop renders before popup in the tree). This is intentional
 * — the project uses only -1, 0, 1 for z-index values.
 * See CLAUDE.md § "z-index: only -1, 0, 1".
 */

export const backdropStyles = css({
  position: "fixed",
  inset: 0,
  bg: "overlay",
  zIndex: 1,
});

/** Shared positioning and chrome for dialog popups. */
const popupBase = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bg: "bg",
  borderRadius: "md",
  boxShadow: "lg",
  p: "lg",
  zIndex: 1,
} as const;

export const alertPopupStyles = css({
  ...popupBase,
  minWidth: { base: "auto", sm: "360px" },
  maxWidth: "400px",
  width: "90vw",
});

export const modalPopupStyles = css({
  ...popupBase,
  width: { base: "90vw", sm: "auto" },
  minWidth: { base: "auto", sm: "400px", md: "720px" },
  maxWidth: "90vw",
  maxHeight: "90vh",
  overflow: "auto",
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
