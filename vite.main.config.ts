import { defineConfig } from "vite";
import { getDefine } from "./src/utils";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@main": path.resolve(__dirname, "./src/main"),
    },
  },
  define: getDefine(),
});
