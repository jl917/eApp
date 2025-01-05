import { utils } from '@electron-forge/core';
import * as os from 'os';
import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';
import { RsbuildPlugin } from './plugins/electron-forge-plugin-rsbuild';
import { getName, getVersion } from './build/utils';
import MakerDMG from './plugins/makeDMG/MakerDMG';
import MakerZIP from './plugins/maker-zip/MakerZIP';
import MakerSquirrel from './plugins/maker-squirrel/MakerSquirrel';

const isMac = os.platform() === 'darwin';

const name = getName();

const config: ForgeConfig = {
  buildIdentifier: process.env.MODE,
  packagerConfig: {
    name,
    executableName: 'eapp',
    asar: true,
    appBundleId: utils.fromBuildIdentifier({
      dev: 'io.github.jl917.dev',
      beta: 'io.github.jl917.beta',
      production: 'io.github.jl917',
    }) as any,
    protocols: [
      {
        name: 'Eapp Deeplink',
        schemes: ['e-app'],
      },
    ],
    icon: isMac
      ? 'src/renderer/public/eapp.ico'
      : 'src/renderer/public/eapp.icns',
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      version: getVersion(),
      iconUrl: 'https://jl917eapp-beta.netlify.app/eapp.ico',
      setupIcon: 'src/renderer/public/eapp.ico',
    }),
    new MakerZIP({}, ['darwin']),
    //
    new MakerRpm({}),
    new MakerDeb({
      options: {
        name,
        productName: 'eapp',
      },
    }),
    new MakerDMG({
      icon: 'src/renderer/public/eapp.icns',
    } as any),
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-s3',
      config: {
        bucket: 'eapp-beta',
        public: true,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    },
  ],
  plugins: [
    new RsbuildPlugin({
      build: [
        {
          entry: 'src/main/main.ts',
          config: 'rsbuild.main.config.ts',
          target: 'main',
        },
        {
          entry: 'src/preload/preload.ts',
          config: 'rsbuild.preload.config.ts',
          target: 'preload',
        },
      ],
      renderer: [
        ...(process.env.MODE === 'dev'
          ? [
              {
                name: 'main_window',
                config: 'rsbuild.renderer.config.ts',
              },
            ]
          : []),
      ],
    }),
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
