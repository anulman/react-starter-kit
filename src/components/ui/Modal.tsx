/**
 * Modal Component
 *
 * A styled modal dialog built on BaseUI's accessible Dialog primitive.
 * Controlled component with optional title, description, and close button.
 *
 * @example
 * ```tsx
 * import { Modal, Button } from "@/components/ui";
 *
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <Button onClick={() => setOpen(true)}>Open Modal</Button>
 *       <Modal
 *         open={open}
 *         onOpenChange={setOpen}
 *         title="Confirm Action"
 *         description="Are you sure you want to proceed?"
 *       >
 *         <Button onClick={() => setOpen(false)}>Close</Button>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 *
 * @see ConfirmDialog - A specialized modal for confirmation dialogs
 */
import type { ReactNode } from "react";
import { Dialog as BaseDialog } from "@base-ui-components/react/dialog";
import { css } from "styled-system/css";
import { CloseIcon } from "@/components/icons";

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
  width: { base: "90vw", sm: "auto" },
  minWidth: { base: "auto", sm: "400px", md: "720px" },
  maxWidth: "90vw",
  maxHeight: "90vh",
  overflow: "auto",
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
  marginBottom: "md",
});

const closeButtonStyles = css({
  position: "absolute",
  top: "md",
  right: "md",
  color: "text.muted",
  cursor: "pointer",
  _hover: {
    color: "text",
  },
});

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  showCloseButton?: boolean;
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  showCloseButton = true,
}: ModalProps) {
  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={backdropStyles} />
        <BaseDialog.Popup className={popupStyles}>
          {showCloseButton && (
            <BaseDialog.Close className={closeButtonStyles}>
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
