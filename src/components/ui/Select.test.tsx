import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Select } from "./Select";

const options = [
  { value: "a", label: "Alpha" },
  { value: "b", label: "Beta" },
  { value: "c", label: "Charlie" },
];

describe("Select", () => {
  it("renders without crashing", () => {
    render(<Select options={options} aria-label="Pick one" />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder text", () => {
    render(<Select options={options} placeholder="Choose..." />);
    expect(screen.getByText("Choose...")).toBeInTheDocument();
  });

  it("renders label", () => {
    render(<Select options={options} label="Color" />);
    expect(screen.getByText("Color")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Select options={options} error="Required" />);
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("sets aria-invalid when error present", () => {
    render(<Select options={options} error="Bad" aria-label="sel" />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("sets aria-describedby for error", () => {
    render(<Select options={options} error="Err" id="my-sel" />);
    const trigger = document.getElementById("my-sel")!;
    expect(trigger.getAttribute("aria-describedby")).toBe("my-sel-error");
  });

  it("is disabled when disabled prop set", () => {
    render(<Select options={options} disabled aria-label="sel" />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("is disabled when loading", () => {
    render(<Select options={options} loading aria-label="sel" />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });
});
