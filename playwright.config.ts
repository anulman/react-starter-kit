import { defineConfig } from "@playwright/test";

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    // In CI, serve the built Worker + static assets via wrangler (instant, no compilation).
    // Locally, use the vite dev server for HMR.
    command: isCI
      ? "bunx wrangler dev dist/server/server.js --assets dist/client --port 3000 --compatibility-date 2025-09-02 --compatibility-flag nodejs_compat"
      : "bun run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !isCI,
    timeout: 30_000,
    stdout: "pipe",
    stderr: "pipe",
  },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
