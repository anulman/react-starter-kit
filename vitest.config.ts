import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const isVitestStorybook = process.env.VITEST_STORYBOOK === "true";

// Base unit test config
const unitTestConfig = defineConfig({
  test: {
    globals: true,
    environment: "node",
    setupFiles: ["./src/test-setup.ts"],
    // ONLY run unit tests in src/ and services/ directories
    // Integration tests in tests/ directory must be run explicitly
    // Story tests run via Storybook's test panel or `bun run test:storybook`
    include: ["./src/**/*.test.ts", "./src/**/*.test.tsx", "./services/**/*.test.ts"],
    exclude: ["node_modules", "dist", ".convex", "tests", "**/*.stories.*"],
    // TSX tests use @vitest-environment happy-dom directive
    alias: {
      "@/convex": path.resolve(dirname, "./convex/_generated"),
      "@": path.resolve(dirname, "./src"),
      "styled-system": path.resolve(dirname, "./styled-system"),
    },
  },
  resolve: {
    alias: {
      "@/convex": path.resolve(dirname, "./convex/_generated"),
      "@": path.resolve(dirname, "./src"),
      "styled-system": path.resolve(dirname, "./styled-system"),
    },
  },
});

// When running from Storybook's test panel, dynamically add the storybook project
async function getConfig() {
  if (!isVitestStorybook) {
    return unitTestConfig;
  }

  // Dynamically import storybook dependencies only when needed
  const { storybookTest } = await import(
    "@storybook/addon-vitest/vitest-plugin"
  );
  const { playwright } = await import("@vitest/browser-playwright");

  const storybookConfigDir = path.join(dirname, ".storybook");

  return defineConfig({
    plugins: [
      storybookTest({
        configDir: storybookConfigDir,
        storybookScript: "bun run dev:storybook",
        tags: {
          include: ["autodocs"],
        },
      }),
    ],
    test: {
      name: `storybook:${storybookConfigDir}`,
      browser: {
        enabled: true,
        provider: playwright(),
        headless: true,
        instances: [{ browser: "chromium" }],
      },
      setupFiles: [".storybook/vitest.setup.ts"],
      alias: {
        "@/convex": path.resolve(dirname, "./convex/_generated"),
        "@": path.resolve(dirname, "./src"),
        "styled-system": path.resolve(dirname, "./styled-system"),
      },
    },
  });
}

export default getConfig();
