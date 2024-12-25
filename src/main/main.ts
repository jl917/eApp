import { app, BrowserWindow, ipcMain } from 'electron';
import started from 'electron-squirrel-startup';
import { updateAction } from '@main/service/autoUpdater';
import { createWindow } from '@main/service/window';
import { getMainVersion } from './service/version';
import { systemMessage } from './service/message';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

app.whenReady().then(updateAction);

app.on('ready', () => {
  createWindow();
  getMainVersion();
  systemMessage();
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

// 타입별 최대 통신 개수 제한
const typeLimits: Record<string, number> = {
  typeA: 5,
  typeB: 10,
};

const typeCounts: Record<string, number> = {};

ipcMain.handle(
  'custom-ipc',
  (event, { type, data }: { type: string; data: any }) => {
    if (!typeLimits[type]) {
      return { error: 'Invalid type', success: false };
    }

    // 현재 타입의 통신 횟수 확인
    if (!typeCounts[type]) typeCounts[type] = 0;

    if (typeCounts[type] >= typeLimits[type]) {
      return { error: `Exceeded limit for type: ${type}`, success: false };
    }

    // 통신 처리
    typeCounts[type] += 1;
    console.log(`Received type: ${type}, data:`, data);

    // 성공 응답
    return { success: true, message: `Processed type: ${type}` };
  }
);
