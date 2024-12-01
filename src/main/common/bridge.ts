import { mainWindow } from "@main/service/window";
import { ipcMain } from "electron";

export const mainToRenderer = (channel: string, data?: any) => {
  mainWindow.webContents.send(`${channel}`, data);
};

export const rendererToMain = (channel: string, cb: () => void) => {
  ipcMain.on(`${channel}`, cb);
};
