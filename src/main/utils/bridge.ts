import windowProcess from '@main/service/window';
import { ipcMain } from 'electron';

export const sendMessage = (channel: Channel, data?: any) => {
  windowProcess.mainWindow.webContents.send(`${channel}`, data);
};

export const receiveMessage = (channel: Channel, cb: () => void) => {
  ipcMain.on(`${channel}`, cb);
};
