import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState } from "./EmptyState";
import { Button } from "./Button";

const meta = {
  component: EmptyState,
  tags: ["autodocs"],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "No items found",
    description: "Get started by creating your first item.",
  },
};

export const WithAction: Story = {
  args: {
    title: "No households yet",
    description: "Create a household to start organizing your home.",
    action: <Button>Create Household</Button>,
  },
};

export const WithIcon: Story = {
  args: {
    icon: "📭",
    title: "No messages",
    description: "You don't have any messages yet.",
  },
};
