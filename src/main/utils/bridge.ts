import { mainWindow } from "@main/service/window";
import { ipcMain } from "electron";

export const sendMessage = (channel: string, data?: any) => {
  mainWindow.webContents.send(`${channel}`, data);
};

export const receiveMessage = (channel: string, cb: () => void) => {
  ipcMain.on(`${channel}`, cb);
};
