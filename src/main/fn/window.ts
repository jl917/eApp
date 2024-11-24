import { BrowserWindow, screen, ipcMain } from "electron";
import path from "path";
import { showNotification } from "@main/common/notification";
import { VITE_ENTRY_URL } from "@/common/constant";
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

  const loadURL = isDev ? MAIN_WINDOW_RSBUILD_DEV_SERVER_URL : VITE_ENTRY_URL;
  mainWindow.loadURL(loadURL);
  showNotification();

  // 모니터가 추가, 삭제되면 mainWindow에 신호보내기
  screen.on("display-removed", () => {
    mainWindow.webContents.send("res-displays", getDisplays());
  });
  screen.on("display-added", () => {
    mainWindow.webContents.send("res-displays", getDisplays());
  });

  // Open the DevTools.
  // isDev && mainWindow.webContents.openDevTools();
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

  const loadURL = `${isDev ? MAIN_WINDOW_RSBUILD_DEV_SERVER_URL : VITE_ENTRY_URL}/subMonitor`;
  extWindow.loadURL(loadURL);

  extWindow.setFullScreenable(false);
}

const getDisplays = () => {
  const displays = screen.getAllDisplays();

  return displays.map((display) => ({
    id: display.id,
    name: display.label || `Display ${display.id}`,
    bounds: display.bounds,
    isPrimary: display.bounds.x === 0 && display.bounds.y === 0,
  }));
};

ipcMain.on("req-displays", (event) => {
  event.reply("res-displays", getDisplays());
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
