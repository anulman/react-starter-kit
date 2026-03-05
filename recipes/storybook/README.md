# Storybook Recipe

## Setup

```bash
bun add -d storybook @storybook/react-vite @storybook/addon-docs @storybook/addon-a11y
```

## Configuration

Copy `.storybook/` into your project root. Add scripts to `package.json`:

```json
{
  "dev:storybook": "storybook dev -p 6006 --no-open",
  "build:storybook": "storybook build"
}
```

## Writing Stories

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Click me", variant: "primary" },
};
```
