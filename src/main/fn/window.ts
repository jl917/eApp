import { BrowserWindow } from "electron";
import path from "path";
import { showNotification } from "@main/common/notification";
import { VITE_ENTRY_URL } from "@main/constant";

export const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const loadURL = isDev ? MAIN_WINDOW_VITE_DEV_SERVER_URL : VITE_ENTRY_URL;
  mainWindow.loadURL(loadURL);
  showNotification();

  // Open the DevTools.
  isDev && mainWindow.webContents.openDevTools();
};
