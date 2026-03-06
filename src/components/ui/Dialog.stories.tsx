import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor, fn } from "storybook/test";
import { ConfirmDialog } from "./ConfirmDialog";
import { Button } from "./Button";

const meta = {
  component: ConfirmDialog,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "danger"],
    },
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: "Confirm Action",
    onConfirm: fn(),
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Confirm Dialog</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          onConfirm={() => {
            args.onConfirm();
            setOpen(false);
          }}
        />
      </>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Dialog should not be visible initially
    expect(within(document.body).queryByRole("alertdialog")).not.toBeInTheDocument();

    // Click the trigger button
    const triggerButton = canvas.getByRole("button", { name: "Open Confirm Dialog" });
    await userEvent.click(triggerButton);

    // Dialog should now be visible
    const dialog = await within(document.body).findByRole("alertdialog");
    expect(dialog).toBeInTheDocument();
    expect(within(dialog).getByText("Confirm Action")).toBeInTheDocument();
    expect(within(dialog).getByText("Are you sure you want to proceed with this action?")).toBeInTheDocument();

    // Click Confirm button
    const confirmButton = within(dialog).getByRole("button", { name: "Confirm" });
    await userEvent.click(confirmButton);

    // Callback should have been called
    expect(args.onConfirm).toHaveBeenCalled();

    // Dialog should be closed
    await waitFor(() => {
      expect(within(document.body).queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  },
};

export const Danger: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: "Delete Item",
    variant: "danger",
    onConfirm: fn(),
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="danger" onClick={() => setOpen(true)}>Delete Item</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Delete Item"
          description="This action cannot be undone. Are you sure you want to delete this item?"
          variant="danger"
          confirmLabel="Delete"
          onConfirm={() => {
            args.onConfirm();
            setOpen(false);
          }}
        />
      </>
    );
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Click to open dialog
    await userEvent.click(canvas.getByRole("button", { name: "Delete Item" }));

    // Dialog should be visible with danger variant button
    const dialog = await within(document.body).findByRole("alertdialog");
    const deleteButton = within(dialog).getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();

    // Cancel instead of confirming
    const cancelButton = within(dialog).getByRole("button", { name: "Cancel" });
    await userEvent.click(cancelButton);

    // Callback should NOT have been called (we cancelled)
    expect(args.onConfirm).not.toHaveBeenCalled();

    // Dialog should be closed
    await waitFor(() => {
      expect(within(document.body).queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  },
};

export const CustomLabels: Story = {
  args: {
    open: false,
    onOpenChange: () => {},
    title: "Unsaved Changes",
    confirmLabel: "Leave",
    cancelLabel: "Stay",
    onConfirm: () => {},
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Leave Page</Button>
        <ConfirmDialog
          open={open}
          onOpenChange={setOpen}
          title="Unsaved Changes"
          description="You have unsaved changes. Are you sure you want to leave?"
          confirmLabel="Leave"
          cancelLabel="Stay"
          onConfirm={() => {
            alert("Left page!");
            setOpen(false);
          }}
        />
      </>
    );
  },
};
