import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./Avatar";

const meta = {
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?u=alice",
    alt: "Alice Johnson",
  },
};

export const WithFallback: Story = {
  args: {
    fallback: "AJ",
    alt: "Alice Johnson",
  },
};

export const BrokenImage: Story = {
  args: {
    src: "https://broken-url.invalid/image.jpg",
    fallback: "??",
    alt: "Unknown User",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <Avatar size="sm" fallback="SM" alt="Small" />
      <Avatar size="md" fallback="MD" alt="Medium" />
      <Avatar size="lg" fallback="LG" alt="Large" />
      <Avatar size="xl" fallback="XL" alt="Extra Large" />
    </div>
  ),
};
