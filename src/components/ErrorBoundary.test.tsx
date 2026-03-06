import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DefaultErrorComponent, DefaultNotFound } from "./ErrorBoundary";

// Mock TanStack Router
vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ navigate: vi.fn() }),
}));

// Mock UI components
vi.mock("@/components/ui", () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>{children}</button>
  ),
}));

describe("DefaultErrorComponent", () => {
  it("renders error heading", () => {
    render(<DefaultErrorComponent error={new Error("boom")} reset={() => {}} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders try again button", () => {
    render(<DefaultErrorComponent error={new Error("x")} reset={() => {}} />);
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument();
  });

  it("calls reset on try again click", async () => {
    const reset = vi.fn();
    render(<DefaultErrorComponent error={new Error("x")} reset={reset} />);
    screen.getByRole("button", { name: "Try again" }).click();
    expect(reset).toHaveBeenCalled();
  });
});

describe("DefaultNotFound", () => {
  it("renders not found heading", () => {
    render(<DefaultNotFound />);
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });

  it("renders go home button", () => {
    render(<DefaultNotFound />);
    expect(screen.getByRole("button", { name: "Go home" })).toBeInTheDocument();
  });
});
