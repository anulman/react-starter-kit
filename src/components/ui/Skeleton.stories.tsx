import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";

const meta = {
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular"],
    },
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: { variant: "text", width: "200px" },
};

export const Circular: Story = {
  args: { variant: "circular", width: "48px", height: "48px" },
};

export const Rectangular: Story = {
  args: { variant: "rectangular", width: "200px", height: "100px" },
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
      <Skeleton variant="circular" width="48px" height="48px" />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="150px" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </div>
    </div>
  ),
};
