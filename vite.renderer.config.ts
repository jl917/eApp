import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { getDefine } from "./src/utils";
import path from "path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [TanStackRouterVite({ routesDirectory: "./src/renderer/routers" }), react()],
  resolve: {
    alias: {
      "@renderer": path.resolve(__dirname, "./src/renderer"),
    },
  },
  define: getDefine(),
});
