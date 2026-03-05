import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor } from "@storybook/test";
import { ColorPicker, PRESET_COLORS } from "./ColorPicker";

const meta = {
  component: ColorPicker,
  tags: ["autodocs"],
  argTypes: {
    showPicker: { control: "boolean" },
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show preset color swatches
    const swatches = canvas.getAllByRole("button");
    expect(swatches.length).toBeGreaterThan(20);

    // First swatch should have aria-label
    const firstSwatch = swatches[0];
    expect(firstSwatch).toHaveAttribute("aria-label");
  },
};

export const WithValue: Story = {
  args: { value: "#22C55E" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the selected swatch
    const selectedSwatch = canvas.getByRole("button", { pressed: true });
    expect(selectedSwatch).toBeInTheDocument();
  },
};

export const CustomColorValue: Story = {
  args: { value: "#8A2BE2" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // With a custom color, should show the hex value
    expect(canvas.getByText("#8A2BE2")).toBeInTheDocument();
  },
};

export const WithCustomPicker: Story = {
  args: { showPicker: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show the hex input when picker is open
    const hexInput = canvas.getByRole("textbox", { name: "Hex color value" });
    expect(hexInput).toBeInTheDocument();

    // Should show "Hide custom picker" toggle
    expect(canvas.getByText("Hide custom picker")).toBeInTheDocument();
  },
};

// Controlled selection demo
function SelectPresetColorDemo() {
  const [color, setColor] = React.useState<string | null>(null);
  return <ColorPicker value={color} onChange={setColor} />;
}

export const SelectPresetColor: Story = {
  render: () => <SelectPresetColorDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on a preset color
    const greenSwatch = canvas.getByRole("button", { name: /Select color #22C55E/i });
    await userEvent.click(greenSwatch);

    // The swatch should now be pressed
    await waitFor(() => {
      expect(greenSwatch).toHaveAttribute("aria-pressed", "true");
    });
  },
};

export const ToggleCustomPicker: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially should show "Custom color..." toggle
    const toggleButton = canvas.getByText("Custom color...");
    expect(toggleButton).toBeInTheDocument();

    // Click to show custom picker
    await userEvent.click(toggleButton);

    // Now should show "Hide custom picker"
    await waitFor(() => {
      expect(canvas.getByText("Hide custom picker")).toBeInTheDocument();
    });

    // Should now have hex input
    const hexInput = canvas.getByRole("textbox", { name: "Hex color value" });
    expect(hexInput).toBeInTheDocument();
  },
};

// Controlled example
function ControlledColorPickerDemo() {
  const [color, setColor] = React.useState("#3B82F6");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <ColorPicker value={color} onChange={setColor} />
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            width: "24px",
            height: "24px",
            backgroundColor: color,
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <span style={{ fontFamily: "monospace" }}>{color}</span>
      </div>
      <button
        type="button"
        onClick={() => setColor(PRESET_COLORS[0]!)}
        style={{ padding: "8px 16px", cursor: "pointer" }}
      >
        Reset to Red
      </button>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledColorPickerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially shows blue
    expect(canvas.getByText("#3B82F6")).toBeInTheDocument();

    // Click reset button
    const resetButton = canvas.getByRole("button", { name: "Reset to Red" });
    await userEvent.click(resetButton);

    // Should now show red
    await waitFor(() => {
      expect(canvas.getByText(PRESET_COLORS[0]!)).toBeInTheDocument();
    });
  },
};
