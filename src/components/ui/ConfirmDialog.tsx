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
  bg: "background",
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
  color: "text",
  marginBottom: "xs",
});

const descriptionStyles = css({
  fontSize: "md",
  color: "text.muted",
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
  onConfirm: () => void;
  variant?: "danger" | "primary";
  loading?: boolean;
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "primary",
  loading = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    if (!loading) {
      onOpenChange(false);
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
                <Button variant="secondary" disabled={loading}>
                  {cancelLabel}
                </Button>
              }
            />
            <Button
              variant={variant}
              onClick={handleConfirm}
              loading={loading}
              disabled={loading}
            >
              {confirmLabel}
            </Button>
          </div>
        </BaseAlertDialog.Popup>
      </BaseAlertDialog.Portal>
    </BaseAlertDialog.Root>
  );
}
