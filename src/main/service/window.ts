import { BrowserWindow, screen, ipcMain } from "electron";
import path from "path";
import { showNotification } from "@main/common/notification";
import { VITE_ENTRY_URL } from "@/common/constant";
import { isDev } from "@/common/utils";
import { mainToRenderer, rendererToMain } from "../common/bridge";

export let mainWindow: BrowserWindow;
let extWindow: BrowserWindow;

const sendDisplays = () => {
  mainToRenderer("displays", getDisplays());
};

export const createWindow = () => {
  const displays = screen.getAllDisplays();
  const mainDisplay = displays.find((display) => {
    return display.bounds.x === 0 && display.bounds.y === 0;
  });
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: mainDisplay.bounds.width,
    height: mainDisplay.bounds.height,
    x: mainDisplay.bounds.x,
    y: mainDisplay.bounds.y,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  const loadURL = isDev ? MAIN_WINDOW_RSBUILD_DEV_SERVER_URL : VITE_ENTRY_URL;
  mainWindow.loadURL(loadURL);

  // 모니터가 추가, 삭제되면 mainWindow에 신호보내기
  screen.on("display-removed", sendDisplays);
  screen.on("display-added", sendDisplays);

  // Open the DevTools.
  // isDev && mainWindow.webContents.openDevTools();
};

export function createExtWindow() {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

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

rendererToMain("displays", sendDisplays);

rendererToMain("open-ext-window", () => {
  if (!extWindow) {
    try {
      createExtWindow();
    } catch {
      showNotification();
    }
  }
  mainToRenderer("displays", getDisplays());
});

rendererToMain("close-ext-window", () => {
  if (extWindow) {
    extWindow.close();
    extWindow = null;
  }
  mainToRenderer("displays", getDisplays());
});
