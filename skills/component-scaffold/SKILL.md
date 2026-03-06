# Component Scaffold Skill

Generates a new UI component following the project's BaseUI + Panda CSS conventions.

## When to Use

When asked to create a new UI component for the design system (`src/components/ui/`).

## Process

### 1. Gather Requirements

Ask for (if not provided):
- **Component name** (PascalCase)
- **What it wraps** -- which BaseUI primitive, or a plain HTML element
- **Variants** -- what visual/behavioral variants does it need?
- **Props** -- any custom props beyond the base element's?

### 2. Generate the Component

Create `src/components/ui/{Name}.tsx` following this exact pattern:

```tsx
import { forwardRef, type ComponentPropsWithoutRef } from "react";
// Import BaseUI primitive if wrapping one:
// import { SomePrimitive } from "@base-ui-components/react/some-primitive";
import { cva, type RecipeVariantProps } from "styled-system/css";

const {name}Recipe = cva({
  base: {
    // Base styles using Panda CSS tokens
  },
  variants: {
    variant: {
      // Named variants
    },
    size: {
      sm: { /* ... */ },
      md: { /* ... */ },
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

type {Name}Variants = RecipeVariantProps<typeof {name}Recipe>;

export type {Name}Props = ComponentPropsWithoutRef<"div"> & // or BaseUI type
  {Name}Variants & {
    // Custom props here
  };

export const {Name} = forwardRef<HTMLDivElement, {Name}Props>(
  function {Name}({ variant, size, className, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={{name}Recipe({ variant, size }) + (className ? ` ${className}` : "")}
        {...props}
      />
    );
  }
);
```

### 3. Update the Barrel Export

Add to `src/components/ui/index.ts`:
```tsx
export { {Name}, type {Name}Props } from "./{Name}";
```

### 4. Generate Stories

Create `src/components/ui/{Name}.stories.tsx` (see storybook-gen skill).

## Rules

- **`cva()` only** -- never use `styled()`
- **`forwardRef` with named function** -- `forwardRef(function MyComponent(...))`
- **Export both component and Props type** from the barrel
- **No `any` types** -- use proper generics or `unknown`
- **z-index: only -1, 0, 1** -- if the component needs stacking, justify it
- **No nested interactive elements** -- never put `<Button>` inside `<Link>` or vice versa
- **Use semantic tokens** (`fg`, `bg.surface`, `border.semantic`) over raw tokens when available
- **Responsive styles are mobile-first**: `{ base: "sm", md: "md", lg: "lg" }`
- **className merging**: Always append incoming `className` (don't discard it)

## Reference Components

Read these for established patterns before generating:
- `src/components/ui/Button.tsx` -- BaseUI wrap + loading state + variant recipe
- `src/components/ui/Modal.tsx` -- Dialog primitive + overlay + portal
- `src/components/ui/Badge.tsx` -- Simple variant-only component
- `src/components/ui/Select.tsx` -- Complex BaseUI primitive with options
- `src/components/ui/Field.tsx` -- Composable field parts (Root, Label, Input, TextArea, Error)
