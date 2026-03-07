import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor } from "storybook/test";
import { fn } from "storybook/test";
import { DangerZone } from "./DangerZone";

const meta = {
  component: DangerZone,
  tags: ["autodocs"],
  argTypes: {
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    onConfirm: fn(),
  },
} satisfies Meta<typeof DangerZone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "Archiving this zone will hide it from the main view.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the default title
    expect(canvas.getByText("Danger Zone")).toBeInTheDocument();

    // Should show description
    expect(canvas.getByText(/Archiving this zone/)).toBeInTheDocument();

    // Should show the action button
    expect(canvas.getByRole("button", { name: "Archive" })).toBeInTheDocument();
  },
};

export const CustomLabels: Story = {
  args: {
    title: "Delete Zone",
    description: "This action cannot be undone. All data will be permanently deleted.",
    actionLabel: "Delete",
    confirmLabel: "Yes, delete it",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByText("Delete Zone")).toBeInTheDocument();
    expect(canvas.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  },
};

export const Loading: Story = {
  args: {
    description: "Archiving this zone...",
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Loading state only applies after confirm is shown
    // First, click the Archive button to reveal confirm
    const archiveButton = canvas.getByRole("button", { name: "Archive" });
    await userEvent.click(archiveButton);

    // Wait for confirm buttons to appear
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: /Confirm/i })).toBeInTheDocument();
    });

    // Now the loading state should disable both buttons
    expect(canvas.getByRole("button", { name: /Confirm/i })).toBeDisabled();
    expect(canvas.getByRole("button", { name: "Cancel" })).toBeDisabled();
  },
};

export const Disabled: Story = {
  args: {
    description: "You don't have permission to archive this zone.",
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Button should be disabled
    const button = canvas.getByRole("button", { name: "Archive" });
    expect(button).toBeDisabled();
  },
};

// Interactive story - two-step confirmation
export const TwoStepConfirmation: Story = {
  args: {
    description: "Archiving this zone will hide it from the main view.",
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Initially shows "Archive" button
    const archiveButton = canvas.getByRole("button", { name: "Archive" });
    expect(archiveButton).toBeInTheDocument();

    // Click to reveal confirm button
    await userEvent.click(archiveButton);

    // Should now show "Confirm" button
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    });

    // Click confirm
    await userEvent.click(canvas.getByRole("button", { name: "Confirm" }));

    // onConfirm should have been called
    await waitFor(() => {
      expect(args.onConfirm).toHaveBeenCalled();
    });
  },
};

// Interactive story - cancel by clicking elsewhere
function CancelConfirmationDemo() {
  const [status, setStatus] = React.useState("Ready");
  return (
    <div style={{ maxWidth: "400px" }}>
      <DangerZone
        description="Archiving this zone will hide it from the main view."
        onConfirm={() => setStatus("Archived!")}
      />
      <button
        type="button"
        onClick={() => setStatus("Cancelled")}
        style={{ marginTop: "1rem", padding: "8px 16px" }}
      >
        Cancel
      </button>
      <p style={{ marginTop: "1rem" }}>Status: {status}</p>
    </div>
  );
}

export const CancelConfirmation: Story = {
  args: {
    description: "Archiving this zone will hide it from the main view.",
  },
  render: () => <CancelConfirmationDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click Archive to reveal Confirm
    await userEvent.click(canvas.getByRole("button", { name: "Archive" }));

    // Should show Confirm
    await waitFor(() => {
      expect(canvas.getByRole("button", { name: "Confirm" })).toBeInTheDocument();
    });

    // Note: The confirm state resets when the DangerZone unmounts or user interacts elsewhere
    // This story demonstrates the two-step flow
  },
};

// Full demo with different action types
function ActionTypesDemo() {
  const [log, setLog] = React.useState<string[]>([]);

  const addLog = (action: string) => {
    setLog((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${action}`]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: "500px" }}>
      <DangerZone
        title="Archive Zone"
        description="Hide this zone from the main view. You can restore it later."
        actionLabel="Archive"
        confirmLabel="Confirm Archive"
        onConfirm={() => addLog("Zone archived")}
      />

      <DangerZone
        title="Delete Project"
        description="Permanently delete this project and all its todos. This cannot be undone."
        actionLabel="Delete"
        confirmLabel="Delete Forever"
        onConfirm={() => addLog("Project deleted")}
      />

      <DangerZone
        title="Leave Household"
        description="You will lose access to all zones and projects in this household."
        actionLabel="Leave"
        confirmLabel="Leave Household"
        onConfirm={() => addLog("Left household")}
      />

      <div style={{ fontFamily: "monospace", fontSize: "12px" }}>
        <strong>Action Log:</strong>
        <ul style={{ margin: "0.5rem 0", padding: "0 0 0 1rem" }}>
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
          {log.length === 0 && <li style={{ color: "#666" }}>No actions yet</li>}
        </ul>
      </div>
    </div>
  );
}

export const ActionTypes: Story = {
  args: {
    description: "Demo of different action types.",
  },
  render: () => <ActionTypesDemo />,
};
