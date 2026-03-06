import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ToastProvider, useToast } from "./ToastProvider";

function ToastTrigger({ message = "Hello", variant }: { message?: string; variant?: "default" | "success" | "error" | "warning" }) {
  const { toast } = useToast();
  return <button onClick={() => toast({ message, variant })}>Show toast</button>;
}

describe("ToastProvider", () => {
  it("renders children", () => {
    render(
      <ToastProvider>
        <p>Child</p>
      </ToastProvider>
    );
    expect(screen.getByText("Child")).toBeInTheDocument();
  });

  it("useToast throws outside provider", () => {
    const Broken = () => { useToast(); return null; };
    expect(() => render(<Broken />)).toThrow("useToast must be used within a ToastProvider");
  });

  it("shows a toast message", async () => {
    render(
      <ToastProvider>
        <ToastTrigger message="Test toast" />
      </ToastProvider>
    );
    await userEvent.click(screen.getByText("Show toast"));
    expect(screen.getByText("Test toast")).toBeInTheDocument();
  });

  it("uses role=alert for error variant", async () => {
    render(
      <ToastProvider>
        <ToastTrigger message="Error!" variant="error" />
      </ToastProvider>
    );
    await userEvent.click(screen.getByText("Show toast"));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("uses role=status for default variant", async () => {
    render(
      <ToastProvider>
        <ToastTrigger message="Info" variant="default" />
      </ToastProvider>
    );
    await userEvent.click(screen.getByText("Show toast"));
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("dismiss button removes toast", async () => {
    render(
      <ToastProvider>
        <ToastTrigger message="Bye" />
      </ToastProvider>
    );
    await userEvent.click(screen.getByText("Show toast"));
    expect(screen.getByText("Bye")).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText("Dismiss"));
    expect(screen.queryByText("Bye")).not.toBeInTheDocument();
  });

  it("auto-dismisses after duration", async () => {
    vi.useFakeTimers();
    render(
      <ToastProvider duration={1000}>
        <ToastTrigger message="Temp" />
      </ToastProvider>
    );
    await act(async () => {
      screen.getByText("Show toast").click();
    });
    expect(screen.getByText("Temp")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1100); });
    expect(screen.queryByText("Temp")).not.toBeInTheDocument();
    vi.useRealTimers();
  });
});
