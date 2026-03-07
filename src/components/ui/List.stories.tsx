import type { Meta, StoryObj } from "@storybook/react-vite";
import { List } from "./List";

const meta = {
  component: List,
  tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </>
    ),
  },
};

export const Ordered: Story = {
  args: {
    as: "ol",
    children: (
      <>
        <li>Step one</li>
        <li>Step two</li>
        <li>Step three</li>
      </>
    ),
  },
};
