import { useState } from "react";
import { css } from "styled-system/css";
import { HStack } from "@/components/layout";
import { Button } from "./Button";

const containerStyles = css({
  mt: "lg",
  p: "md",
  borderLeft: "3px solid token(colors.danger)",
  bg: "#fff5f5",
  borderRadius: "sm",
  display: "flex",
  alignItems: "center",
  gap: "xl",
});

const contentStyles = css({
  flex: 1,
});

const titleStyles = css({
  fontSize: "sm",
  fontWeight: "medium",
  color: "feedback.error",
  mb: "xs",
});

const descStyles = css({
  fontSize: "sm",
  color: "text.muted",
});

const actionsStyles = css({
  flexShrink: 0,
});

export type DangerZoneProps = {
  /** Title text (defaults to "Danger Zone") */
  title?: string;
  /** Description explaining the action's consequences */
  description: string;
  /** Text for the initial action button (defaults to "Archive") */
  actionLabel?: string;
  /** Text for the confirmation button (defaults to "Confirm") */
  confirmLabel?: string;
  /** Called when the user confirms the action */
  onConfirm: () => void;
  /** Whether the action is currently in progress */
  loading?: boolean;
  /** Whether the action buttons should be disabled */
  disabled?: boolean;
};

/**
 * Danger zone section for destructive actions like archiving or deleting.
 *
 * Displays a warning section with a two-step confirmation pattern:
 * 1. User clicks the action button (e.g., "Archive Zone")
 * 2. Confirm/Cancel buttons appear to prevent accidental actions
 *
 * @example
 * ```tsx
 * <DangerZone
 *   description="Archiving this zone will hide it from the zone list."
 *   actionLabel="Archive Zone"
 *   confirmLabel="Confirm Archive"
 *   onConfirm={() => archiveZone(zoneId)}
 *   loading={isArchiving}
 *   disabled={isSaving}
 * />
 * ```
 */
export function DangerZone({
  title = "Danger Zone",
  description,
  actionLabel = "Archive",
  confirmLabel = "Confirm",
  onConfirm,
  loading = false,
  disabled = false,
}: DangerZoneProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    // Reset confirmation state after action (parent should close modal on success)
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className={containerStyles}>
      <div className={contentStyles}>
        <div className={titleStyles}>{title}</div>
        <p className={descStyles}>{description}</p>
      </div>
      <div className={actionsStyles}>
        {showConfirm ? (
          <HStack gap="sm">
            <Button
              variant="danger"
              onClick={handleConfirm}
              disabled={disabled || loading}
              loading={loading}
            >
              {confirmLabel}
            </Button>
            <Button
              variant="ghost"
              onClick={handleCancel}
              disabled={disabled || loading}
            >
              Cancel
            </Button>
          </HStack>
        ) : (
          <Button
            variant="danger"
            onClick={() => setShowConfirm(true)}
            disabled={disabled}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
