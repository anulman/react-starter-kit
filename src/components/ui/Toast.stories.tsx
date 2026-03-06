import type { Meta, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect } from "@storybook/test";
import { useToast, ToastProvider } from "./ToastProvider";
import { Button } from "./Button";

// Create a wrapper component for stories since Toast requires useToast hook
function ToastDemo({ variant, title, message }: { variant?: "default" | "success" | "error" | "warning"; title?: string; message: string }) {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ variant, title, message })}>
      Show {variant || "default"} toast
    </Button>
  );
}

const meta = {
  component: ToastDemo,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "error", "warning"],
    },
  },
} satisfies Meta<typeof ToastDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { message: "This is a default notification" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the button to show toast
    await userEvent.click(canvas.getByRole("button"));

    // Toast should appear (uses role="status" for notifications)
    const toast = await within(document.body).findByRole("status");
    expect(toast).toBeInTheDocument();
    expect(toast).toHaveTextContent("This is a default notification");
  },
};

export const Success: Story = {
  args: { variant: "success", message: "Operation completed successfully!" },
};

export const Error: Story = {
  args: { variant: "error", message: "Something went wrong. Please try again." },
};

export const Warning: Story = {
  args: { variant: "warning", message: "Please review your changes before continuing." },
};

export const WithTitle: Story = {
  args: { variant: "success", title: "Saved", message: "Your changes have been saved." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Click the button to show toast
    await userEvent.click(canvas.getByRole("button"));

    // Toast should appear with both title and message
    const toast = await within(document.body).findByRole("status");
    expect(toast).toHaveTextContent("Saved");
    expect(toast).toHaveTextContent("Your changes have been saved.");
  },
};

export const AllVariants: Story = {
  args: { message: "" },
  render: () => {
    const { toast } = useToast();
    return (
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        <Button variant="secondary" onClick={() => toast({ message: "Default notification" })}>
          Default
        </Button>
        <Button onClick={() => toast({ variant: "success", message: "Success!" })}>
          Success
        </Button>
        <Button variant="danger" onClick={() => toast({ variant: "error", message: "Error occurred!" })}>
          Error
        </Button>
        <Button variant="ghost" onClick={() => toast({ variant: "warning", message: "Warning!" })}>
          Warning
        </Button>
      </div>
    );
  },
};
