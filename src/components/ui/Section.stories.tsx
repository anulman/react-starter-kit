import type { Meta, StoryObj } from "@storybook/react-vite";
import { Section } from "./Section";

const meta = {
  component: Section,
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h2>Section Title</h2>
        <p>Section content goes here.</p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: "none",
    children: <p>No padding section.</p>,
  },
};

export const SmallMaxWidth: Story = {
  args: {
    maxWidth: "sm",
    children: <p>Constrained width section.</p>,
  },
};
