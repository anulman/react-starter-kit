import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";

const meta = {
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
    rows: { control: "number" },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Enter description..." },
};

export const WithLabel: Story = {
  args: { label: "Description", placeholder: "Enter a description...", rows: 4 },
};

export const WithError: Story = {
  args: { label: "Description", error: "Description is required", rows: 3 },
};

export const Disabled: Story = {
  args: { label: "Notes", disabled: true, value: "This field is disabled" },
};
