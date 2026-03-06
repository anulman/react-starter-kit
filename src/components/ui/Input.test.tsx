import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("renders without crashing", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders label when provided", () => {
    render(<Input label="Name" />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    render(<Input placeholder="Type here" />);
    const input = screen.getByPlaceholderText("Type here");
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("shows error message", () => {
    render(<Input error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input error="Bad" placeholder="x" />);
    expect(screen.getByPlaceholderText("x")).toHaveAttribute("aria-invalid", "true");
  });

  it("sets aria-describedby pointing to error id", () => {
    render(<Input error="Oops" id="my-input" />);
    const input = document.getElementById("my-input")!;
    expect(input.getAttribute("aria-describedby")).toBe("my-input-error");
    expect(document.getElementById("my-input-error")).toHaveTextContent("Oops");
  });

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled placeholder="no" />);
    expect(screen.getByPlaceholderText("no")).toBeDisabled();
  });
});
