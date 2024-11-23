import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { getDefine } from "./src/utils";
import path from "path";

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@renderer": path.resolve(__dirname, "./src/renderer"),
    },
  },
  define: getDefine(),
});
