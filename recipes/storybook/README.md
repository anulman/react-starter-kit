# Storybook Recipe

Component development and visual testing with Storybook.

## Additional Dependencies

```bash
bun add -d storybook @storybook/react-vite @storybook/test @storybook/addon-a11y @storybook/addon-docs
```

## Setup

```bash
npx storybook init --builder vite
```

## Story Pattern

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect } from "@storybook/test";

const meta = {
  component: MyComponent,
  tags: ["autodocs"],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByRole("button")).toBeInTheDocument();
  },
};
```

## Guidelines

- Every UI component should have a `.stories.tsx` file
- Include stories for: default state, all variants, disabled state, controlled examples
- Use `play` functions for interactive testing
