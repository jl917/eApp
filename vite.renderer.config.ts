import { defineConfig } from "vite";
import { getDefine } from "./src/utils";

// https://vitejs.dev/config
export default defineConfig({
  define: getDefine(),
});
