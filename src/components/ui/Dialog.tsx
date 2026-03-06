import { useState } from "react";
import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { css } from "styled-system/css";
import { Button } from "./Button";

const backdropStyles = css({
  position: "fixed",
  inset: 0,
  bg: "rgba(0, 0, 0, 0.5)",
  zIndex: 1,
});

const popupStyles = css({
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

const titleStyles = css({
  fontSize: "lg",
  fontWeight: "semibold",
  color: "fg",
  marginBottom: "xs",
});

const descriptionStyles = css({
  fontSize: "md",
  color: "fg.muted",
  marginBottom: "lg",
});

const actionsStyles = css({
  display: "flex",
  justifyContent: "flex-end",
  gap: "sm",
});

export type ConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  variant?: "danger" | "primary";
};

/**
 * AlertDialog - For acknowledgement-only scenarios (just OK, no Cancel)
 * Similar to window.alert() - use when you need to inform the user of something
 * but there's no action to confirm or cancel.
 */
export type AlertDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
};

export function AlertDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "OK",
}: AlertDialogProps) {
  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className={backdropStyles} />
        <BaseAlertDialog.Popup className={popupStyles}>
          <BaseAlertDialog.Title className={titleStyles}>
            {title}
          </BaseAlertDialog.Title>
          {description && (
            <BaseAlertDialog.Description className={descriptionStyles}>
              {description}
            </BaseAlertDialog.Description>
          )}
          <div className={actionsStyles}>
            <BaseAlertDialog.Close
              render={<Button variant="primary">{confirmLabel}</Button>}
            />
          </div>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}

/**
 * ConfirmDialog - For actions requiring user confirmation (OK + Cancel)
 * Similar to window.confirm() - use when the user must decide whether to proceed.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "primary",
}: ConfirmDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BaseAlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseAlertDialog.Portal>
        <BaseAlertDialog.Backdrop className={backdropStyles} />
        <BaseAlertDialog.Popup className={popupStyles}>
          <BaseAlertDialog.Title className={titleStyles}>
            {title}
          </BaseAlertDialog.Title>
          {description && (
            <BaseAlertDialog.Description className={descriptionStyles}>
              {description}
            </BaseAlertDialog.Description>
          )}
          <div className={actionsStyles}>
            <BaseAlertDialog.Close
              render={
                <Button variant="secondary" disabled={isLoading}>
                  {cancelLabel}
                </Button>
              }
            />
            <Button
              variant={variant}
              onClick={handleConfirm}
              loading={isLoading}
              disabled={isLoading}
            >
              {confirmLabel}
            </Button>
          </div>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
