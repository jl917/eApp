// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { app, BrowserWindow, Notification } from "electron";
import path from "path";
import started from "electron-squirrel-startup";

// 자동 업데이트
import { autoUpdater } from "electron-updater";

function setupAutoUpdater() {
  autoUpdater.setFeedURL({
    provider: "github",
    repo: "jl917/eApp",
    owner: "jl917",
  });

  autoUpdater.checkForUpdatesAndNotify();

  autoUpdater.on("update-available", () => {
    // 업데이트 가능할 때 로직
    showNotification();
  });

  autoUpdater.on("update-downloaded", () => {
    // 업데이트 다운로드 완료 시 로직
    autoUpdater.quitAndInstall();
  });
}

// Electron 앱 초기화 시 호출
app.whenReady().then(setupAutoUpdater);

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const isDev = process.env.MODE === "dev";

function showNotification() {
  const notification = new Notification({
    title: "업데이트 필요",
    body: import.meta.env.VITE_ENTRY_URL,
  });
  notification.show();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const loadURL = isDev ? MAIN_WINDOW_VITE_DEV_SERVER_URL : import.meta.env.VITE_ENTRY_URL;
  mainWindow.loadURL(loadURL);
  // showNotification();

  // Open the DevTools.
  isDev && mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
