import type { ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import { css } from "styled-system/css";
import { CloseIcon } from "@/components/icons";
import {
  backdropStyles,
  modalPopupStyles,
  titleStyles,
  descriptionStyles,
} from "./dialogStyles";

const closeButtonStyles = css({
  position: "absolute",
  top: "md",
  right: "md",
  color: "fg.muted",
  cursor: "pointer",
  _hover: { color: "fg" },
});

type ModalPropsBase = {
  open: boolean;
  title?: string;
  description?: string;
  children: ReactNode;
  showCloseButton?: boolean;
};

export type ModalProps = ModalPropsBase &
  (
    | { onOpenChange: (open: boolean) => void; onClose?: never }
    | { onClose: () => void; onOpenChange?: never }
  );

export function Modal({
  open,
  onOpenChange,
  onClose,
  title,
  description,
  children,
  showCloseButton = true,
}: ModalProps) {
  const handleOpenChange = (nextOpen: boolean) => {
    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else if (!nextOpen && onClose) {
      onClose();
    }
  };

  return (
    <BaseDialog.Root open={open} onOpenChange={handleOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={backdropStyles} />
        <BaseDialog.Popup className={modalPopupStyles}>
          {showCloseButton && (
            <BaseDialog.Close className={closeButtonStyles} aria-label="Close">
              <CloseIcon size={20} />
            </BaseDialog.Close>
          )}
          {title && (
            <BaseDialog.Title className={titleStyles}>{title}</BaseDialog.Title>
          )}
          {description && (
            <BaseDialog.Description className={descriptionStyles}>
              {description}
            </BaseDialog.Description>
          )}
          {children}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
