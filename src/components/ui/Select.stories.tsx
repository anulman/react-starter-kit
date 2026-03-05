import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor } from "@storybook/test";
import { Select } from "./Select";

const sampleOptions = [
  { value: "admin", label: "Admin" },
  { value: "member", label: "Member" },
  { value: "guest", label: "Guest" },
];

const optionsWithDisabled = [
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "archived", label: "Archived", disabled: true },
];

const meta = {
  component: Select,
  tags: ["autodocs"],
  args: {
    options: sampleOptions,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    loading: { control: "boolean" },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Select a role..." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    // Initially shows placeholder
    expect(trigger).toHaveTextContent("Select a role...");

    // Open dropdown
    await userEvent.click(trigger);

    // Options should be visible (in portal, so query document)
    const listbox = await within(document.body).findByRole("listbox");
    expect(listbox).toBeInTheDocument();

    // Select an option
    const adminOption = within(listbox).getByRole("option", { name: "Admin" });
    await userEvent.click(adminOption);

    // Wait for dropdown to close and value to update
    await waitFor(() => {
      expect(within(document.body).queryByRole("listbox")).not.toBeInTheDocument();
    });

    // Trigger should now show selected value
    expect(trigger).toHaveTextContent("Admin");
  },
};

export const WithLabel: Story = {
  args: { label: "Role", placeholder: "Choose a role" },
};

export const WithError: Story = {
  args: { label: "Role", error: "Please select a role" },
};

export const WithDisabledOption: Story = {
  args: { label: "Status", options: optionsWithDisabled },
};

export const Loading: Story = {
  args: { label: "Role", loading: true, placeholder: "Loading roles..." },
};

export const Disabled: Story = {
  args: { label: "Role", disabled: true, value: "member" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    // Trigger should be disabled
    expect(trigger).toBeDisabled();

    // Click should not open dropdown
    await userEvent.click(trigger);

    // Listbox should not exist
    const listbox = within(document.body).queryByRole("listbox");
    expect(listbox).not.toBeInTheDocument();
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
      <Select size="sm" label="Small" options={sampleOptions} placeholder="Small" />
      <Select size="md" label="Medium" options={sampleOptions} placeholder="Medium" />
      <Select size="lg" label="Large" options={sampleOptions} placeholder="Large" />
    </div>
  ),
};

// Controlled example demonstrating value + onValueChange usage
function ControlledSelectDemo() {
  const [value, setValue] = React.useState<string | null>("member");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
      <Select
        label="Controlled Role"
        options={sampleOptions}
        value={value ?? undefined}
        onValueChange={setValue}
        placeholder="Select a role"
      />
      <p style={{ fontSize: "14px", color: "#666" }}>
        Selected value: <strong>{value ?? "(none)"}</strong>
      </p>
      <button
        type="button"
        onClick={() => setValue("guest")}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        Set to Guest
      </button>
      <button
        type="button"
        onClick={() => setValue(null)}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        Clear selection
      </button>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSelectDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("combobox");

    // Should show initial controlled value
    expect(trigger).toHaveTextContent("Member");

    // Click "Set to Guest" button
    const setGuestButton = canvas.getByRole("button", { name: "Set to Guest" });
    await userEvent.click(setGuestButton);

    // Value should update via controlled state
    await waitFor(() => {
      expect(trigger).toHaveTextContent("Guest");
    });

    // Click "Clear selection" button
    const clearButton = canvas.getByRole("button", { name: "Clear selection" });
    await userEvent.click(clearButton);

    // Should show placeholder when cleared
    await waitFor(() => {
      expect(trigger).toHaveTextContent("Select a role");
    });
  },
};
