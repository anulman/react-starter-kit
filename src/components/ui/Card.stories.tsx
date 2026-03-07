import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card";

const meta = {
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3>Card Title</h3>
        <p>Card content with some descriptive text.</p>
      </div>
    ),
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => alert("Card clicked!"),
    children: (
      <div>
        <h3>Clickable Card</h3>
        <p>Click me to trigger an action.</p>
      </div>
    ),
  },
};
