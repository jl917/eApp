import { mainWindow } from "@main/service/window";
import { ipcMain } from "electron";

export const mainToRenderer = (channel: string, data?: any) => {
  mainWindow.webContents.send(`res-${channel}`, data);
};

export const rendererToMain = (channel: string, cb: () => void) => {
  ipcMain.on(`req-${channel}`, cb);
};
