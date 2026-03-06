import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders children when open", () => {
    render(
      <Modal open onOpenChange={() => {}}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render children when closed", () => {
    render(
      <Modal open={false} onOpenChange={() => {}}>
        <p>Hidden</p>
      </Modal>
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("renders title when provided", () => {
    render(
      <Modal open onOpenChange={() => {}}>
        <p>body</p>
      </Modal>
    );
    // no title
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("renders title and description", () => {
    render(
      <Modal open onOpenChange={() => {}} title="My Title" description="My Desc">
        <p>body</p>
      </Modal>
    );
    expect(screen.getByText("My Title")).toBeInTheDocument();
    expect(screen.getByText("My Desc")).toBeInTheDocument();
  });

  it("calls onOpenChange when closing", async () => {
    const onOpenChange = vi.fn();
    render(
      <Modal open onOpenChange={onOpenChange} showCloseButton>
        <p>content</p>
      </Modal>
    );
    const closeBtn = screen.getByRole("button", { name: "Close" });
    closeBtn.click();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("calls onClose when closing (alternative API)", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} showCloseButton>
        <p>content</p>
      </Modal>
    );
    const closeBtn = screen.getByRole("button", { name: "Close" });
    closeBtn.click();
    expect(onClose).toHaveBeenCalled();
  });

  it("hides close button when showCloseButton is false", () => {
    render(
      <Modal open onOpenChange={() => {}} showCloseButton={false}>
        <p>no close</p>
      </Modal>
    );
    const dialog = screen.getByRole("dialog");
    expect(dialog.querySelector("button")).toBeNull();
  });
});
