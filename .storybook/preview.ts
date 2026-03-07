import type { Preview } from "@storybook/react-vite";
import React from "react";
import { ToastProvider } from "../src/components/ui/ToastProvider";
import "../src/styles.css";

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
      // a11y automated testing disabled — axe-core produces false positives
      // with Panda CSS atomic classes. Run manual a11y audits instead.
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
