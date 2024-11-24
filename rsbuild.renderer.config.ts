import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { TanStackRouterRspack } from "@tanstack/router-plugin/rspack";
import { getDefine } from "./src/utils";
import path from "path";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

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
      rspack(config, { appendPlugins }) {
        appendPlugins(TanStackRouterRspack({ routesDirectory: "./src/renderer/routers" }));
        // 仅在 RSDOCTOR 为 true 时注册插件，因为插件会增加构建耗时
        if (process.env.RSDOCTOR) {
          appendPlugins(
            new RsdoctorRspackPlugin({
              disableClientServer: true,
              mode: "brief",
              reportDir: "./.rsdoctor/renderer",
            })
          );
        }
      },
    },
  };
});
