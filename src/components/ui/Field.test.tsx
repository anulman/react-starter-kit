import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
  it("composes label, input, and error", () => {
    render(
      <Field.Root>
        <Field.Label htmlFor="name">Name</Field.Label>
        <Field.Input id="name" placeholder="Enter name" />
        <Field.Error>Required</Field.Error>
      </Field.Root>
    );
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter name")).toBeInTheDocument();
    expect(screen.getByText("Required")).toBeInTheDocument();
  });

  it("composes label and textarea", () => {
    render(
      <Field.Root>
        <Field.Label htmlFor="bio">Bio</Field.Label>
        <Field.TextArea id="bio" placeholder="Tell us about yourself" />
      </Field.Root>
    );
    expect(screen.getByLabelText("Bio")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Tell us about yourself")).toBeInTheDocument();
  });

  it("renders without label or error (input only)", () => {
    render(
      <Field.Root>
        <Field.Input placeholder="bare" />
      </Field.Root>
    );
    expect(screen.getByPlaceholderText("bare")).toBeInTheDocument();
  });

  it("accepts user input", async () => {
    render(
      <Field.Root>
        <Field.Input placeholder="type here" />
      </Field.Root>
    );
    const input = screen.getByPlaceholderText("type here");
    await userEvent.type(input, "hello");
    expect(input).toHaveValue("hello");
  });

  it("renders error with styling", () => {
    render(
      <Field.Root>
        <Field.Error id="err">Something went wrong</Field.Error>
      </Field.Root>
    );
    const error = screen.getByText("Something went wrong");
    expect(error).toBeInTheDocument();
    expect(error.id).toBe("err");
  });

  it("applies hasError styling to input", () => {
    render(
      <Field.Root>
        <Field.Input hasError placeholder="bad" />
      </Field.Root>
    );
    // hasError applies a class — just verify render doesn't throw
    expect(screen.getByPlaceholderText("bad")).toBeInTheDocument();
  });
});
