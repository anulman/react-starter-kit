import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "./Sidebar";

const meta = {
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <a href="#">Dashboard</a>
        <a href="#">Households</a>
        <a href="#">Settings</a>
      </nav>
    ),
  },
};
