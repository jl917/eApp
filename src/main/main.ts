import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';
import started from 'electron-squirrel-startup';
import { updateAction } from '@main/service/autoUpdater';
import { createWindow } from '@main/service/window';
import { getMainVersion } from './service/version';
import { ipcUtils } from './utils/ipc';
import { initSentry } from './service/sentry';
import { powerSystem } from './service/power';
import { initDeeplink } from './service/deeplink';
import { genTrayMenu } from './service/trayMenu';

const powerService = powerSystem();

app.setPath('userData', path.join(app.getPath('userData'), process.env.mode));

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

initSentry();

app.on('ready', () => {
  updateAction();
  createWindow();
  getMainVersion();
  initDeeplink();
  genTrayMenu();
  powerService.start();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  // Stop the power save blocker when the app is about to quit
  if (powerService.isBlocker()) {
    powerService.stop();
  }
});

ipcMain.handle('custom-ipc', ipcUtils);
