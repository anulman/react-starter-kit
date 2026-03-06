import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["./src/**/*.test.ts", "./src/**/*.test.tsx"],
    exclude: ["node_modules", "dist", "**/*.stories.*"],
    alias: {
      "@": path.resolve(dirname, "./src"),
      "styled-system": path.resolve(dirname, "./styled-system"),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
      "styled-system": path.resolve(dirname, "./styled-system"),
    },
  },
});
