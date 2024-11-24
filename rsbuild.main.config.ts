import { defineConfig } from "@rsbuild/core";
import { getDefine } from "./src/utils";
import path from "path";

export default defineConfig({
  source: {
    define: getDefine(),
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@main": path.resolve(__dirname, "./src/main"),
    },
  },
});
