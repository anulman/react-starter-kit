import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta = {
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "HomeHub" },
};

export const WithNavigation: Story = {
  args: {
    children: (
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <span>HomeHub</span>
        <nav style={{ display: "flex", gap: "1rem" }}>
          <a href="#">Home</a>
          <a href="#">Settings</a>
          <a href="#">Logout</a>
        </nav>
      </div>
    ),
  },
};
