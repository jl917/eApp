import { defineConfig } from "vite";
import { getDefine } from "./src/utils";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    alias: {
      "@preload": path.resolve(__dirname, "./src/preload"),
    },
  },
  define: getDefine(),
});
