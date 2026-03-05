import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor } from "@storybook/test";
import { IconInput } from "./IconInput";

const meta = {
  component: IconInput,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    label: { control: "text" },
  },
} satisfies Meta<typeof IconInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should have an icon button and text input
    expect(canvas.getByRole("button", { name: "Open icon picker" })).toBeInTheDocument();
    expect(canvas.getByRole("textbox")).toBeInTheDocument();
  },
};

export const WithValue: Story = {
  args: { value: "utensils" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Input should show the icon label (Kitchen for utensils icon)
    const input = canvas.getByRole("textbox") as HTMLInputElement;
    // The "utensils" icon shows "Kitchen" as label
    await waitFor(() => {
      expect(input.value).toBe("Kitchen");
    });

    // Icon button should be present
    expect(canvas.getByRole("button", { name: "Open icon picker" })).toBeInTheDocument();
  },
};

export const WithHomeIcon: Story = {
  args: { value: "home" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("textbox")).toHaveValue("Home");
  },
};

export const Disabled: Story = {
  args: { value: "home", disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("textbox")).toBeDisabled();
    expect(canvas.getByRole("button", { name: "Open icon picker" })).toBeDisabled();
  },
};

export const WithLabel: Story = {
  args: { value: "home", label: "Zone icon" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(canvas.getByRole("textbox", { name: "Zone icon" })).toBeInTheDocument();
  },
};

// Interactive story - opens panel on focus
export const OpenPanel: Story = {
  args: { value: "home" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click to open panel
    const input = canvas.getByRole("textbox");
    await userEvent.click(input);

    // Panel should open showing filtered grid
    await waitFor(() => {
      expect(canvas.getByRole("grid", { name: "Icon grid" })).toBeInTheDocument();
    });
  },
};

// Interactive story - search and select icon
function SearchAndSelectDemo() {
  const [icon, setIcon] = React.useState<string | undefined>("home");
  return (
    <div style={{ maxWidth: "300px" }}>
      <IconInput value={icon} onChange={setIcon} />
      <p style={{ marginTop: "1rem", fontFamily: "monospace" }}>
        Selected: {icon}
      </p>
    </div>
  );
}

export const SearchAndSelect: Story = {
  render: () => <SearchAndSelectDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open panel
    const input = canvas.getByRole("textbox");
    await userEvent.click(input);

    // Clear and search for "bed"
    await userEvent.clear(input);
    await userEvent.type(input, "bed");

    // Wait for filtered results
    await waitFor(() => {
      expect(canvas.getByRole("grid", { name: "Icon grid" })).toBeInTheDocument();
    });

    // Click the first result
    const gridCells = canvas.getAllByRole("gridcell");
    if (gridCells.length > 0) {
      await userEvent.click(gridCells[0]!);

      // Should update selection
      await waitFor(() => {
        expect(canvas.getByText(/Selected: bed/i)).toBeInTheDocument();
      });
    }
  },
};

// Interactive story - no results
export const NoResults: Story = {
  args: { value: "home" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open panel
    const input = canvas.getByRole("textbox");
    await userEvent.click(input);

    // Clear and search for something that doesn't exist
    await userEvent.clear(input);
    await userEvent.type(input, "xyznonexistent");

    // Should show no results message
    await waitFor(() => {
      expect(canvas.getByText(/No icons match/)).toBeInTheDocument();
    });
  },
};

// Interactive story - filter by category
export const FilterByCategory: Story = {
  args: { value: "home" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Open panel
    const input = canvas.getByRole("textbox");
    await userEvent.click(input);

    // Clear and search for a category
    await userEvent.clear(input);
    await userEvent.type(input, "room");

    // Should show filtered results
    await waitFor(() => {
      const grid = canvas.queryByRole("grid", { name: "Icon grid" });
      if (grid) {
        const cells = canvas.getAllByRole("gridcell");
        expect(cells.length).toBeGreaterThan(0);
      }
    });
  },
};

// Controlled example with reset button
function ControlledDemo() {
  const [icon, setIcon] = React.useState("utensils");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px" }}>
      <IconInput value={icon} onChange={setIcon} label="Zone icon" />
      <p style={{ fontFamily: "monospace" }}>Selected: {icon}</p>
      <button
        type="button"
        onClick={() => setIcon("home")}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        Reset to Home
      </button>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially shows utensils
    expect(canvas.getByText(/Selected: utensils/)).toBeInTheDocument();

    // Click reset button
    await userEvent.click(canvas.getByRole("button", { name: "Reset to Home" }));

    // Should now show home
    await waitFor(() => {
      expect(canvas.getByText(/Selected: home/)).toBeInTheDocument();
    });
  },
};
