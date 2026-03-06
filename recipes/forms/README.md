# Forms Recipe

Form handling with TanStack Form + Zod validation + the starter kit's UI components.

## Dependencies

Already included in the starter kit: `@tanstack/react-form`, `zod`.

## Pattern

```tsx
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import * as ui from "@/components/ui";
import { Flex, VStack } from "@/components/layout";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function ContactForm({ onSubmit }: { onSubmit: (data: ContactForm) => Promise<void> }) {
  const form = useForm({
    defaultValues: { name: "", email: "", message: "" } satisfies ContactForm,
    onSubmit: async ({ value }) => {
      const result = contactSchema.safeParse(value);
      if (!result.success) return;
      await onSubmit(result.data);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <VStack gap="md">
        <form.Field name="name">
          {(field) => (
            <ui.Input
              label="Name"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors?.[0]}
            />
          )}
        </form.Field>

        <form.Field name="email">
          {(field) => (
            <ui.Input
              type="email"
              label="Email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors?.[0]}
            />
          )}
        </form.Field>

        <form.Field name="message">
          {(field) => (
            <ui.TextArea
              label="Message"
              rows={4}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              error={field.state.meta.errors?.[0]}
            />
          )}
        </form.Field>

        <Flex justify="flex-end">
          <ui.Button
            type="submit"
            loading={form.state.isSubmitting}
          >
            Send
          </ui.Button>
        </Flex>
      </VStack>
    </form>
  );
}
```

## Key Patterns

### Validation

Use Zod schemas for validation. Parse in `onSubmit` for form-level validation,
or use field-level validators for instant feedback:

```tsx
<form.Field
  name="email"
  validators={{
    onChange: ({ value }) => {
      const result = z.string().email().safeParse(value);
      return result.success ? undefined : "Invalid email";
    },
  }}
>
  {(field) => <ui.Input ... />}
</form.Field>
```

### Server Functions

Combine with TanStack Start server functions:

```tsx
import { createServerFn } from "@tanstack/react-start";

const submitContact = createServerFn({ method: "POST" })
  .validator(contactSchema)
  .handler(async ({ data }) => {
    // Server-side: save to DB, send email, etc.
    return { success: true };
  });

// In your form's onSubmit:
onSubmit: async ({ value }) => {
  await submitContact({ data: value });
}
```

### Error Display

The starter kit's `Input` and `TextArea` accept an `error` prop for inline validation messages.
For more granular control, use the `Field` composition pattern:

```tsx
<Field.Root>
  <Field.Label htmlFor="name">Name</Field.Label>
  <Field.Input id="name" hasError={!!error} />
  <Field.Error>{error}</Field.Error>
</Field.Root>
```

For form-level errors, use `AlertDialog` or the toast system.
