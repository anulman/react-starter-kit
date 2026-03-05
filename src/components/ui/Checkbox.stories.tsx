import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";

const meta = {
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Accept terms and conditions" },
};

export const Checked: Story = {
  args: { label: "Newsletter subscription", checked: true },
};

export const Disabled: Story = {
  args: { label: "Cannot be changed", disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: "Already agreed", disabled: true, checked: true },
};
