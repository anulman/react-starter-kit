import type { Meta, StoryObj } from "@storybook/react-vite";
import { Timestamp } from "./Timestamp";

const meta = {
  component: Timestamp,
  tags: ["autodocs"],
  argTypes: {
    relative: { control: "boolean" },
  },
} satisfies Meta<typeof Timestamp>;

export default meta;
type Story = StoryObj<typeof meta>;

const now = Date.now();
const fiveMinutesAgo = now - 5 * 60 * 1000;
const oneHourAgo = now - 60 * 60 * 1000;
const yesterday = now - 24 * 60 * 60 * 1000;

export const Absolute: Story = {
  args: { date: now, relative: false },
};

export const Relative: Story = {
  args: { date: fiveMinutesAgo, relative: true },
};

export const RelativeHour: Story = {
  args: { date: oneHourAgo, relative: true },
};

export const RelativeDay: Story = {
  args: { date: yesterday, relative: true },
};
