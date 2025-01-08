import { defineConfig } from '@rsbuild/core';
import path from 'path';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { getDefine } from './build/utils';
import { version } from './package.json';

const mode = process.env.NODE_ENV;
const isSourceMap = mode === 'beta' || mode === 'production';

export default defineConfig({
  source: {
    define: {
      ...getDefine(),
      MAIN_VERSION: JSON.stringify(version),
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@main': path.resolve(__dirname, './src/main'),
    },
  },
  output: {
    sourceMap: isSourceMap,
  },
  tools: {
    rspack(config, { appendPlugins }) {
      const newConfig = { ...config };
      newConfig.resolve.extensions = [...newConfig.resolve.extensions, '.node'];
      if (process.env.RSDOCTOR) {
        appendPlugins(
          new RsdoctorRspackPlugin({
            disableClientServer: true,
            mode: 'brief',
            reportDir: './.rsdoctor/main',
          })
        );
      }

      if (isSourceMap) {
        appendPlugins(
          sentryWebpackPlugin({
            org: 'julong',
            project: 'electron',
            authToken: process.env.SENTRY_AUTH_TOKEN,
          })
        );
      }
      return newConfig;
    },
  },
});
