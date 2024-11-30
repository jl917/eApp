// build.config용 유틸
// import { loadEnv } from "vite";
import { loadEnv } from "@rsbuild/core";
import { execSync } from "child_process";
import packages from "../package.json";

export const mode = process.env.MODE;

// export const getDefine = () => {
//   const env = loadEnv(mode, process.cwd(), "VITE");
//   const define: any = {};
//   for (const [prop, value] of Object.entries(env)) {
//     define[prop] = JSON.stringify(value);
//   }
//   return define;
// };

export const getDefine = () => {
  const { publicVars } = loadEnv({ prefixes: ["VITE_"], mode });
  return {
    ...publicVars,
  };
};

export const getName = () => {
  return `${packages.productName}${mode !== "production" ? `-${mode}` : ""}`;
};

const getVersion = () => {
  const output = execSync("npx semantic-release --dry-run", { encoding: "utf-8" });
  const match = output.match(/The next release version is (\d+\.\d+\.\d+)/);
  const nextVersion = match?.[1];
  return nextVersion || packages.version;
};

export const version = getVersion();