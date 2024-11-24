import { utils } from "@electron-forge/core";
import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { MakerDMG } from "@electron-forge/maker-dmg";

import { VitePlugin } from "@electron-forge/plugin-vite";
import { RsbuildPlugin } from "./src/plugins/electron-forge-plugin-rsbuild";
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { getName } from "./src/utils";

const name = getName();

const config: ForgeConfig = {
  buildIdentifier: process.env.MODE,
  packagerConfig: {
    name,
    executableName: "eapp",
    asar: true,
    appBundleId: utils.fromBuildIdentifier({
      beta: "io.github.jl917.beta",
      production: "io.github.jl917",
    }) as any,
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
    new MakerZIP(
      {
        macUpdateManifestBaseUrl: "https://github.com/jl917/eApp/releases/download/",
      },
      ["darwin"]
    ),
    //
    new MakerRpm({}),
    new MakerDeb({
      options: {
        name,
        productName: "eapp",
      },
    }),
    new MakerDMG(),
  ],
  plugins: [
    new RsbuildPlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: "src/main/main.ts",
          config: "rsbuild.main.config.ts",
          target: "main",
        },
        {
          entry: "src/preload/preload.ts",
          config: "rsbuild.preload.config.ts",
          target: "preload",
        },
      ],
      renderer: [
        ...(process.env.MODE === "dev"
          ? [
              {
                name: "main_window",
                config: "rsbuild.renderer.config.ts",
              },
            ]
          : []),
      ],
    }),
    // new VitePlugin({
    //   // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
    //   // If you are familiar with Vite configuration, it will look really familiar.
    //   build: [
    //     {
    //       // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
    //       entry: "src/main/main.ts",
    //       config: "vite.main.config.ts",
    //       target: "main",
    //     },
    //     {
    //       entry: "src/preload/preload.ts",
    //       config: "vite.preload.config.ts",
    //       target: "preload",
    //     },
    //   ],
    // renderer: [
    //   ...(process.env.MODE === "dev"
    //     ? [
    //         {
    //           name: "main_window",
    //           config: "vite.renderer.config.ts",
    //         },
    //       ]
    //     : []),
    // ],
    // }),
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
