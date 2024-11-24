import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";
import { getDefine } from "./src/utils";
import path from "path";

export default defineConfig(() => {
  return {
    html: {
      template: "./index.html",
    },
    source: {
      entry: {
        index: "src/renderer/index.tsx",
      },
      define: getDefine(),
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@renderer": path.resolve(__dirname, "./src/renderer"),
      },
    },
    plugins: [pluginReact()],
    tools: {
      rspack: {
        plugins: [TanStackRouterRspack({ routesDirectory: "./src/renderer/routers" })],
      },
    },
  };
});
