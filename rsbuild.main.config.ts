import { defineConfig } from "@rsbuild/core";
import { getDefine, mode } from "./src/utils";
import path from "path";
import { RsdoctorRspackPlugin } from "@rsdoctor/rspack-plugin";

console.log(mode)

export default defineConfig({
  source: {
    define: getDefine(),
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
