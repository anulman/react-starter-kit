import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      external: ["cloudflare:workers"],
    },
  },
  resolve: {
    alias: {
      // React 19 includes useSyncExternalStore natively. These aliases
      // redirect shim imports to the real package for compatibility with
      // libraries that haven't fully dropped the shim yet.
      "use-sync-external-store/shim/index.js": "use-sync-external-store",
      "use-sync-external-store/shim/with-selector.js": "use-sync-external-store",
    },
  },
  optimizeDeps: {
    exclude: ["@tanstack/react-start", "@tanstack/start-server-core"],
  },
  plugins: [
    tsConfigPaths(),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    viteReact(),
  ],
});
