# Storybook Generation Skill

Generates Storybook stories for UI components, covering all variants, states, and accessibility checks.

## When to Use

- After creating a new component (pairs with component-scaffold skill)
- When asked to add stories for an existing component
- When a component's API changes and stories need updating

## Process

### 1. Read the Component

Read the target component file to understand:
- All variant props and their values (from the `cva()` recipe)
- Custom props (loading, disabled, error, etc.)
- Children expectations (text, elements, none)
- Any interactive behavior

### 2. Generate Stories

Create `src/components/ui/{Name}.stories.tsx`:

```tsx
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within, userEvent } from "@storybook/test";
import { {Name} } from "./{Name}";

const meta = {
  component: {Name},
  tags: ["autodocs"],
  argTypes: {
    // Map variant props to controls
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof {Name}>;

export default meta;
type Story = StoryObj<typeof meta>;

// --- Default ---
export const Default: Story = {
  args: {
    // Default props
  },
};

// --- One story per variant ---
export const Primary: Story = {
  args: { variant: "primary" },
};

// --- States ---
export const Disabled: Story = {
  args: { disabled: true },
};

// --- Interactive test ---
export const ClickInteraction: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByRole("button"); // adjust role
    await userEvent.click(element);
    // Assert expected behavior
  },
};

// --- Accessibility ---
export const A11yCheck: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const element = canvas.getByRole("button"); // adjust role
    expect(element).toBeVisible();
    // Add more a11y assertions as appropriate
  },
};
```

### 3. Coverage Checklist

Every story file should include:

- [ ] **Default** -- component with default props
- [ ] **All variant values** -- one story per variant option (primary, secondary, etc.)
- [ ] **All size values** -- one story per size (sm, md, lg)
- [ ] **Disabled state** -- if the component accepts `disabled`
- [ ] **Loading state** -- if the component accepts `loading`
- [ ] **Error state** -- if the component accepts `error`
- [ ] **Empty/placeholder state** -- if applicable
- [ ] **Interactive test** -- at least one `play` function testing click/type/select
- [ ] **Long content** -- test with overflow text to verify truncation/wrapping
- [ ] **Composition** -- if the component is used with other components (e.g., Button inside a form)

## Rules

- **Import from `@storybook/react-vite`** (not `@storybook/react`)
- **Import test utilities from `@storybook/test`** (not `@testing-library/*` directly)
- **Use `satisfies Meta<typeof Component>`** for type safety
- **Use `tags: ["autodocs"]`** to auto-generate docs
- **Use `play` functions** for interactive stories -- don't rely on manual testing
- **Use semantic roles** (`getByRole`) over test IDs where possible
- **Name stories descriptively** -- `PrimarySmall`, `DisabledWithLoading`, not `Story1`
- **No `any` types** in story args

## Reference Stories

Read these for established patterns:
- `src/components/ui/Button.stories.tsx`
- `src/components/ui/Modal.stories.tsx` (or Dialog.stories.tsx)
- `src/components/ui/Badge.stories.tsx`
