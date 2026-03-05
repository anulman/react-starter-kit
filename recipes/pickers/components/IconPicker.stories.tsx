import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor } from "@storybook/test";
import { IconPicker, ZONE_ICONS, getZoneIcon } from "./IconPicker";

const meta = {
  component: IconPicker,
  tags: ["autodocs"],
} satisfies Meta<typeof IconPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Should show all icons as buttons
    const buttons = canvas.getAllByRole("button");
    expect(buttons.length).toBe(ZONE_ICONS.length);

    // Each button should have a title and aria-label
    const firstButton = buttons[0];
    expect(firstButton).toHaveAttribute("title");
    expect(firstButton).toHaveAttribute("aria-label");
  },
};

export const WithValue: Story = {
  args: { value: "utensils" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // The selected icon button should be pressed
    const selectedButton = canvas.getByRole("button", { pressed: true });
    expect(selectedButton).toBeInTheDocument();
    expect(selectedButton).toHaveAttribute("aria-label", "Select Kitchen icon");
  },
};

// Controlled selection demo
function SelectIconDemo() {
  const [icon, setIcon] = React.useState<string | null>(null);
  return <IconPicker value={icon} onChange={setIcon} />;
}

export const SelectIcon: Story = {
  render: () => <SelectIconDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click on the bed icon
    const bedButton = canvas.getByRole("button", { name: /Select Bedroom icon/i });
    await userEvent.click(bedButton);

    // The button should now be pressed
    await waitFor(() => {
      expect(bedButton).toHaveAttribute("aria-pressed", "true");
    });
  },
};

export const LivingSpaceIcons: Story = {
  args: { value: "home" },
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        Living space icons: home, door, bed, sofa, armchair, stairs
      </p>
      <IconPicker {...args} />
    </div>
  ),
};

export const KitchenIcons: Story = {
  args: { value: "utensils" },
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        Kitchen icons: utensils, coffee, refrigerator, microwave, wine
      </p>
      <IconPicker {...args} />
    </div>
  ),
};

export const OutdoorIcons: Story = {
  args: { value: "tree" },
  render: (args) => (
    <div style={{ maxWidth: "400px" }}>
      <p style={{ marginBottom: "1rem", color: "#666" }}>
        Outdoor icons: tree, sun, flower, leaf, umbrella, fence, grill, pool
      </p>
      <IconPicker {...args} />
    </div>
  ),
};

// Controlled example
function ControlledIconPickerDemo() {
  const [icon, setIcon] = React.useState<string | null>("home");
  const IconComponent = getZoneIcon(icon);
  const iconLabel = ZONE_ICONS.find((i) => i.name === icon)?.label ?? "None";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}>
      <IconPicker value={icon} onChange={setIcon} />
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <IconComponent size={24} />
        <span>Selected: {iconLabel}</span>
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button
          type="button"
          onClick={() => setIcon("utensils")}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Set to Kitchen
        </button>
        <button
          type="button"
          onClick={() => setIcon("bed")}
          style={{ padding: "8px 16px", cursor: "pointer" }}
        >
          Set to Bedroom
        </button>
      </div>
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledIconPickerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Initially shows "Home"
    expect(canvas.getByText("Selected: Home")).toBeInTheDocument();

    // Click "Set to Kitchen"
    const kitchenButton = canvas.getByRole("button", { name: "Set to Kitchen" });
    await userEvent.click(kitchenButton);

    // Should now show Kitchen
    await waitFor(() => {
      expect(canvas.getByText("Selected: Kitchen")).toBeInTheDocument();
    });

    // The utensils button should be pressed
    const utensilsButton = canvas.getByRole("button", { name: /Select Kitchen icon/i });
    expect(utensilsButton).toHaveAttribute("aria-pressed", "true");
  },
};

// Helper function showcase
export const GetZoneIconHelper: Story = {
  render: () => {
    const icons = ["home", "utensils", "bed", "tree", "invalid", null];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p style={{ color: "#666" }}>
          Using <code>getZoneIcon()</code> helper function:
        </p>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {icons.map((iconName, idx) => {
            const Icon = getZoneIcon(iconName);
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              >
                <Icon size={24} />
                <code style={{ fontSize: "12px" }}>
                  {iconName === null ? "null" : `"${iconName}"`}
                </code>
              </div>
            );
          })}
        </div>
        <p style={{ color: "#666", fontSize: "14px" }}>
          Invalid or null values fall back to HomeIcon
        </p>
      </div>
    );
  },
};
