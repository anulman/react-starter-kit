import type { Meta, StoryObj } from "@storybook/react-vite";
import { Main } from "./Main";

const meta = {
  component: Main,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Main>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h1>Page Title</h1>
        <p>Main content area with proper padding and max-width constraints.</p>
      </div>
    ),
  },
};
