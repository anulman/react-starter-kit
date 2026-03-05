import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Enter text..." },
};

export const WithLabel: Story = {
  args: { label: "Email", placeholder: "you@example.com" },
};

export const WithError: Story = {
  args: { label: "Email", error: "Invalid email address", value: "invalid" },
};

export const Disabled: Story = {
  args: { label: "Email", disabled: true, value: "disabled@example.com" },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "300px" }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
};

export const Phone: Story = {
  args: {
    type: "tel",
    label: "Phone Number",
  },
};

export const PhoneWithError: Story = {
  args: {
    type: "tel",
    label: "Phone Number",
    error: "Invalid phone number",
    value: "555",
  },
};
