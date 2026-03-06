import type { Preview } from "@storybook/react-vite";
import React from "react";
import { ToastProvider } from "../src/components/ui/ToastProvider";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    a11y: {
      // Enable automated a11y checks on all stories
      test: "todo",
    },
  },
  decorators: [
    // Wrap all stories with ToastProvider so useToast() works
    (Story) =>
      React.createElement(ToastProvider, null, React.createElement(Story)),
  ],
};

export default preview;
