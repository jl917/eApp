import { BrowserWindow, screen, ipcMain } from "electron";
import path from "path";
import { showNotification } from "@main/common/notification";
import { VITE_ENTRY_URL } from "@main/constant";
import { isDev } from "@main/utils";

let mainWindow: BrowserWindow;
let extWindow: BrowserWindow;

export const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
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

export function createExtWindow() {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  if (externalDisplay) {
    extWindow = new BrowserWindow({
      x: externalDisplay.bounds.x,
      y: externalDisplay.bounds.y,
      width: externalDisplay.bounds.width,
      height: externalDisplay.bounds.height,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      frame: false,
      fullscreen: true,
      alwaysOnTop: true,
    });
  } else {
    extWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
      frame: false,
      fullscreen: true,
    });
  }

  const loadURL = `${isDev ? MAIN_WINDOW_VITE_DEV_SERVER_URL : VITE_ENTRY_URL}/sub`;
  extWindow.loadURL(loadURL);

  extWindow.on("closed", () => {
    extWindow = null;
    if (mainWindow) {
      mainWindow.webContents.send("ext-window-status", {
        isOpen: false,
        display: null,
      });
    }
  });

  extWindow.webContents.on("did-finish-load", () => {
    if (mainWindow) {
      mainWindow.webContents.send("ext-window-status", {
        isOpen: true,
        display: externalDisplay ? "external" : "primary",
      });
    }
  });

  extWindow.setFullScreenable(false);
}

ipcMain.on("req-displays", (event) => {
  const displays = screen.getAllDisplays();
  event.reply(
    "res-displays",
    displays.map((display) => ({
      id: display.id,
      name: display.label || `Display ${display.id}`,
      bounds: display.bounds,
      isPrimary: display.bounds.x === 0 && display.bounds.y === 0,
    }))
  );
});

// 확장 화면 상태 확인 - 수정된 버전
ipcMain.on("req-ext-window-status", (event) => {
  event.reply("res-ext-window-status", {
    isOpen: extWindow !== null,
    display: extWindow
      ? extWindow.getBounds().x !== 0 || extWindow.getBounds().y !== 0
        ? "external"
        : "primary"
      : null,
  });
});

ipcMain.on("req-open-ext-window", (event) => {
  if (!extWindow) {
    createExtWindow();
  }
  event.reply("req-open-ext-window", true);
});

ipcMain.on("req-close-ext-window", (event) => {
  if (extWindow) {
    extWindow.close();
    extWindow = null;
  }
  event.reply("req-close-ext-window", true);
});
