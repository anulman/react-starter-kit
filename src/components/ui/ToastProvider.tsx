import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { css, cva } from "styled-system/css";
import { CloseIcon } from "@/components/icons";

const toastContainerStyles = css({
  position: "fixed",
  bottom: "md",
  right: "md",
  display: "flex",
  flexDirection: "column",
  gap: "sm",
  zIndex: 1,
  maxWidth: "400px",
});

const toastRecipe = cva({
  base: {
    display: "flex",
    alignItems: "flex-start",
    gap: "sm",
    p: "md",
    borderRadius: "md",
    boxShadow: "md",
    animation: "slideIn 200ms ease-out",
  },
  variants: {
    variant: {
      default: {
        bg: "bg",
        color: "fg",
        borderWidth: "1px", borderStyle: "solid", borderColor: "border.semantic",
      },
      success: { bg: "success", color: "white" },
      error: { bg: "danger", color: "white" },
      warning: { bg: "warning", color: "fg" },
    },
  },
  defaultVariants: { variant: "default" },
});

const contentStyles = css({ flex: 1 });
const titleStyles = css({ fontWeight: "medium", marginBottom: "xs" });
const messageStyles = css({ fontSize: "sm", opacity: 0.9 });
const closeButtonStyles = css({
  flexShrink: 0,
  cursor: "pointer",
  opacity: 0.7,
  _hover: { opacity: 1 },
});

type ToastVariant = "default" | "success" | "error" | "warning";

type Toast = {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
};

type ToastInput = Omit<Toast, "id">;

type ToastContextValue = {
  toast: (input: ToastInput) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

export type ToastProviderProps = {
  children: ReactNode;
  duration?: number;
};

export function ToastProvider({ children, duration = 5000 }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    (input: ToastInput) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...input, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [duration]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toasts.length > 0 && (
        <div className={toastContainerStyles}>
          {toasts.map((t) => (
            <div key={t.id} role={t.variant === "error" || t.variant === "warning" ? "alert" : "status"} className={toastRecipe({ variant: t.variant })}>
              <div className={contentStyles}>
                {t.title && <div className={titleStyles}>{t.title}</div>}
                <div className={messageStyles}>{t.message}</div>
              </div>
              <button onClick={() => dismiss(t.id)} className={closeButtonStyles} aria-label="Dismiss">
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}
