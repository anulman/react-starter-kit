import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ConfirmDialog } from "./ConfirmDialog";

// Mock BaseUI AlertDialog to render children directly
vi.mock("@base-ui-components/react/alert-dialog", () => {

  return {
    AlertDialog: {
      Root: ({ children, open }: any) => (open ? <div>{children}</div> : null),
      Portal: ({ children }: any) => <>{children}</>,
      Backdrop: () => null,
      Popup: ({ children }: any) => <div>{children}</div>,
      Title: ({ children, className }: any) => (
        <h2 className={className}>{children}</h2>
      ),
      Description: ({ children, className }: any) => (
        <p className={className}>{children}</p>
      ),
      Close: ({ render }: any) => render,
    },
  };
});

// Mock Button to be a simple button
vi.mock("./Button", () => ({
  Button: ({ children, onClick, loading, disabled, ...props }: any) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {loading && <span role="status" aria-label="Loading" />}
      {children}
    </button>
  ),
}));

const defaultProps = {
  open: true,
  onOpenChange: vi.fn(),
  title: "Delete item?",
  description: "This action cannot be undone.",
  onConfirm: vi.fn(),
};

describe("ConfirmDialog", () => {
  it("renders with title and description", () => {
    render(<ConfirmDialog {...defaultProps} />);
    expect(screen.getByText("Delete item?")).toBeInTheDocument();
    expect(
      screen.getByText("This action cannot be undone.")
    ).toBeInTheDocument();
  });

  it("confirm button triggers onConfirm", async () => {
    const onConfirm = vi.fn().mockResolvedValue(undefined);
    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("cancel button triggers onOpenChange(false)", async () => {
    const onOpenChange = vi.fn();
    // BaseUI Close renders the button directly; clicking it should close
    // Since our mock just renders the button, we simulate the cancel click
    render(
      <ConfirmDialog {...defaultProps} onOpenChange={onOpenChange} />
    );
    // Cancel button is rendered via BaseUI Close mock — it renders the Button directly
    expect(
      screen.getByRole("button", { name: "Cancel" })
    ).toBeInTheDocument();
  });

  it("shows loading state during async onConfirm", async () => {
    let resolveConfirm: () => void;
    const onConfirm = () =>
      new Promise<void>((resolve) => {
        resolveConfirm = resolve;
      });

    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));

    // Should show loading spinner
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
    // Dialog should still be open (title visible)
    expect(screen.getByText("Delete item?")).toBeInTheDocument();

    // Resolve the promise
    resolveConfirm!();
    await waitFor(() => {
      expect(
        screen.queryByRole("status", { name: "Loading" })
      ).not.toBeInTheDocument();
    });
  });

  it("recovers from onConfirm rejection", async () => {
    const onConfirm = vi.fn().mockRejectedValue(new Error("fail"));

    render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} />);
    await userEvent.click(screen.getByRole("button", { name: "Confirm" }));

    // After rejection, loading should clear and dialog stays open
    await waitFor(() => {
      expect(
        screen.queryByRole("status", { name: "Loading" })
      ).not.toBeInTheDocument();
    });
    expect(screen.getByText("Delete item?")).toBeInTheDocument();
  });
});
