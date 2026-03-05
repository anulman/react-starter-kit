# Component API Reference

All components are imported via namespace:
```tsx
import * as ui from "@/components/ui";
```

## Form Components

### Button
```tsx
<ui.Button variant="primary" size="md" loading={false}>Save</ui.Button>
```
| Prop | Type | Default |
|------|------|---------|
| variant | `"primary" \| "secondary" \| "danger" \| "ghost"` | `"primary"` |
| size | `"sm" \| "md" \| "lg"` | `"md"` |
| loading | `boolean` | `false` |
| disabled | `boolean` | `false` |

### Input
```tsx
<ui.Input label="Email" error={errors.email} size="md" />
```
| Prop | Type | Default |
|------|------|---------|
| label | `string` | — |
| error | `string` | — |
| size | `"sm" \| "md" \| "lg"` | `"md"` |
| containerProps | `HTMLAttributes<HTMLDivElement>` | — |

### TextArea
Same API as Input but for multi-line text. Adds `resize: vertical` by default.

### Select
```tsx
<ui.Select
  options={[{ value: "a", label: "Option A" }]}
  value={selected}
  onValueChange={setSelected}
  label="Choose"
/>
```
| Prop | Type | Default |
|------|------|---------|
| options | `SelectOption[]` | required |
| value | `string` | — |
| onValueChange | `(value: string \| null) => void` | — |
| label | `string` | — |
| error | `string` | — |
| loading | `boolean` | `false` |
| triggerLabel | `ReactNode` | — |

### Checkbox
```tsx
<ui.Checkbox label="I agree" checked={agreed} onCheckedChange={setAgreed} />
```

## Feedback Components

### Modal
```tsx
<ui.Modal open={open} onOpenChange={setOpen} title="Edit Item">
  {children}
</ui.Modal>
```

### ConfirmDialog
```tsx
<ui.ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="Delete item?"
  description="This cannot be undone."
  onConfirm={handleDelete}
  variant="danger"
/>
```

### AlertDialog
Like `window.alert()` — acknowledgement only (OK button, no Cancel).

### ToastProvider + useToast
```tsx
// Wrap app in <ui.ToastProvider>
const { toast } = ui.useToast();
toast({ message: "Saved!", variant: "success" });
```
Variants: `"default" | "success" | "error" | "warning"`

### LoadingSpinner
```tsx
<ui.LoadingSpinner size="md" label="Loading data..." />
```

### Skeleton
```tsx
<ui.Skeleton variant="text" width="200px" />
<ui.Skeleton variant="circular" width={40} />
<ui.Skeleton variant="rectangular" height={80} />
```

## Data Display

### Badge
```tsx
<ui.Badge variant="success" size="sm">Active</ui.Badge>
```

### EmptyState
```tsx
<ui.EmptyState
  icon={<SearchIcon size={48} />}
  title="No results"
  description="Try a different search term."
  action={<ui.Button>Clear filters</ui.Button>}
/>
```

## Layout Components

```tsx
import { Flex, Grid, HStack, VStack, Box, Center } from "@/components/layout";

<HStack gap="md">...</HStack>
<VStack gap="sm">...</VStack>
<Center>...</Center>
<Grid columns={3} gap="lg">...</Grid>
```

## Icons

```tsx
import { CheckIcon, CloseIcon, PlusIcon } from "@/components/icons";

<CheckIcon size={16} />
```

All icons accept `size` (number) and standard SVG props.
Available: CheckIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, PlusIcon, MenuIcon, SettingsIcon.
