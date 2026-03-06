import type { StorybookConfig } from "@storybook/react-vite";
import type { PluginOption } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/react-vite",
  core: {
    disableWhatsNewNotifications: true,
  },
  viteFinal: async (config) => {
    // Filter out TanStack Start and Cloudflare plugins that break Storybook
    const blockPatterns = ["tanstack", "cloudflare", "start-"];

    const filterPlugins = (plugins: PluginOption[]): PluginOption[] => {
      return plugins.flatMap((plugin) => {
        if (!plugin) return [];
        if (Array.isArray(plugin)) return filterPlugins(plugin);
        const name = (plugin as { name?: string }).name || "";
        const isBlocked = blockPatterns.some((p) =>
          name.toLowerCase().includes(p)
        );
        return isBlocked ? [] : [plugin];
      });
    };

    return {
      ...config,
      plugins: filterPlugins(config.plugins || []),
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          "@": path.resolve(dirname, "../src"),
          "styled-system": path.resolve(dirname, "../styled-system"),
        },
      },
      optimizeDeps: {
        ...config.optimizeDeps,
        exclude: [], // Don't exclude TanStack packages in Storybook
      },
    };
  },
};

export default config;
