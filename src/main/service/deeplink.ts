import { app, ipcMain, shell, dialog } from 'electron';
import path from 'node:path';
import { windowProcess } from './window';
import { RSBUILD_ENTRY_URL } from '@/common/constant';
import { productName } from '../../../package.json';

const { mainWindow } = windowProcess;
const mode = process.env.MODE;
const scheme = mode === 'production' ? productName : `${productName}-${mode}`;

export const initDeeplink = () => {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(scheme, process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient(scheme);
  }

  // 어플은 한개만 지원하기
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', (event, commandLine) => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        mainWindow.focus();
      }

      dialog.showErrorBox(
        'Welcome Back',
        `You arrived from: ${commandLine.pop().slice(0, -1)}`
      );
    });

    app.on('open-url', (event, url) => {
      dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`);
    });
  }

  // Handle window controls via IPC
  ipcMain.on('shell:open', () => {
    shell.openExternal(RSBUILD_ENTRY_URL);
  });
};
