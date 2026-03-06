import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor } from "storybook/test";
import { Modal } from "./Modal";
import { Button } from "./Button";

const meta = {
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    showCloseButton: { control: "boolean" },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    children: null,
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Modal Title"
          description="This is the modal description."
        >
          <p>Modal content goes here.</p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Modal>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Modal should not be visible initially
    expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument();

    // Click the trigger button
    const triggerButton = canvas.getByRole("button", { name: "Open Modal" });
    await userEvent.click(triggerButton);

    // Modal should now be visible
    const dialog = await within(document.body).findByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("Modal Title")).toBeInTheDocument();
    expect(within(dialog).getByText("This is the modal description.")).toBeInTheDocument();

    // Close via Cancel button
    const cancelButton = within(dialog).getByRole("button", { name: "Cancel" });
    await userEvent.click(cancelButton);

    // Modal should be closed
    await waitFor(() => {
      expect(within(document.body).queryByRole("dialog")).not.toBeInTheDocument();
    });
  },
};

export const NoCloseButton: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    showCloseButton: false,
    children: null,
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          title="Confirm Action"
          showCloseButton={false}
        >
          <p>Are you sure you want to proceed?</p>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
            <Button variant="secondary" onClick={() => setOpen(false)}>No</Button>
            <Button onClick={() => setOpen(false)}>Yes</Button>
          </div>
        </Modal>
      </>
    );
  },
};
