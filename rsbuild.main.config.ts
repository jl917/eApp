import { defineConfig } from "@rsbuild/core";
import { getDefine, getVersion, mode } from "./src/utils";
import path from "path";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

const version = getVersion();

export default defineConfig({
  source: {
    define: {
      ...getDefine(),
      MAIN_VERSION: JSON.stringify(version),
    },
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@main": path.resolve(__dirname, "./src/main"),
    },
  },
  tools: {
    rspack(config, { appendPlugins }) {
      if (process.env.RSDOCTOR) {
        appendPlugins(
          new RsdoctorRspackPlugin({
            disableClientServer: true,
            mode: "brief",
            reportDir: "./.rsdoctor/main",
          })
        );
      }
    },
  },
});
