import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { DefaultErrorComponent, DefaultNotFound } from "./ErrorBoundary";

// Mock TanStack Router
vi.mock("@tanstack/react-router", () => ({
  useRouter: () => ({ navigate: vi.fn() }),
  useNavigate: () => vi.fn(),
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
    expect(reset).toHaveBeenCalledOnce();
  });

  it("shows error details in dev mode", () => {
    // import.meta.env.DEV is true in test environment
    render(<DefaultErrorComponent error={new Error("boom")} reset={() => {}} />);
    expect(screen.getByText(/boom/)).toBeInTheDocument();
  });

  it("hides error details in production mode", () => {
    vi.stubEnv("DEV", false);
    try {
      const error = new Error("secret-details");
      error.stack = "Error: secret-details\n    at Object.<anonymous> (file.ts:1:1)";
      render(<DefaultErrorComponent error={error} reset={() => {}} />);
      expect(screen.getByText("Something went wrong")).toBeInTheDocument();
      expect(screen.queryByText(/secret-details/)).not.toBeInTheDocument();
      expect(screen.queryByText(/stack/i)).not.toBeInTheDocument();
    } finally {
      vi.unstubAllEnvs();
    }
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
