import { loadEnv } from "vite";
import packages from "../package.json";

const mode = process.env.MODE;

export const getDefine = () => {
  const env = loadEnv(mode, process.cwd(), "VITE");
  const define: any = {};
  for (const [prop, value] of Object.entries(env)) {
    define[prop] = JSON.stringify(value);
  }
  return define;
};

export const getName = () => {
  return `${packages.productName}${mode !== "production" ? `-${mode}` : ""}`;
};
