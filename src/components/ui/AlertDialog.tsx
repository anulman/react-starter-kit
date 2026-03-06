import { AlertDialog as BaseAlertDialog } from "@base-ui-components/react/alert-dialog";
import { Button } from "./Button";
import {
  backdropStyles,
  alertPopupStyles,
  titleStyles,
  alertDescriptionStyles,
  actionsStyles,
} from "./dialogStyles";

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
        <BaseAlertDialog.Popup className={alertPopupStyles}>
          <BaseAlertDialog.Title className={titleStyles}>
            {title}
          </BaseAlertDialog.Title>
          {description && (
            <BaseAlertDialog.Description className={alertDescriptionStyles}>
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
