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
  const { publicVars, rawPublicVars } = loadEnv({ prefixes: ["RSBUILD_"], mode });
  return {
    ...publicVars,
    ...rawPublicVars,
  };
};

export const getName = () => {
  return `${packages.productName}${mode !== "production" ? `-${mode}` : ""}`;
};

export const getVersion = () => {
  if (process.env.MODE === "dev") {
    return `dev-${packages.version}`;
  }

  const output = execSync("npx semantic-release --dry-run", { encoding: "utf-8" });
  const match = output.match(/next release version is (\S+)/);
  const nextVersion = match?.[1];

  return nextVersion || packages.version;
};
