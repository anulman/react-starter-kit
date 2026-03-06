import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders without crashing", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders as a span element", () => {
    render(<Badge data-testid="badge">Tag</Badge>);
    expect(screen.getByTestId("badge").tagName).toBe("SPAN");
  });

  it("passes through HTML attributes", () => {
    render(<Badge data-testid="badge" title="info">X</Badge>);
    expect(screen.getByTestId("badge")).toHaveAttribute("title", "info");
  });

  it("applies custom className", () => {
    render(<Badge className="custom" data-testid="badge">Y</Badge>);
    expect(screen.getByTestId("badge").className).toContain("custom");
  });

  it("renders children correctly", () => {
    render(<Badge><strong>Bold</strong></Badge>);
    expect(screen.getByText("Bold").tagName).toBe("STRONG");
  });

  it("forwards ref", () => {
    const ref = { current: null as HTMLSpanElement | null };
    render(<Badge ref={ref}>Ref</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLSpanElement);
  });
});
