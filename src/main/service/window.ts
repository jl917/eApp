import { BrowserWindow, screen } from 'electron';
import path from 'path';
import { showNotification } from '@/main/utils/notification';
import { RSBUILD_ENTRY_URL } from '@/common/constant';
import { isDev } from '@/common/utils';

const loadURL = isDev ? MAIN_WINDOW_RSBUILD_DEV_SERVER_URL : RSBUILD_ENTRY_URL;

interface WindowProcess {
  mainWindow: null | BrowserWindow;
  extWindow: null | BrowserWindow;
}

export const windowProcess: WindowProcess = {
  mainWindow: null,
  extWindow: null,
};

export const getDisplays = () => {
  const displays = screen.getAllDisplays();
  const data = displays.map((display) => ({
    id: display.id,
    name: display.label || `Display ${display.id}`,
    bounds: display.bounds,
    isPrimary: display.bounds.x === 0 && display.bounds.y === 0,
  }));
  windowProcess.mainWindow.webContents.send('custom-ipc', {
    type: 'displays',
    data,
  });
  return data;
};

export const createWindow = () => {
  const displays = screen.getAllDisplays();
  const mainDisplay = displays.find((display) => {
    return display.bounds.x === 0 && display.bounds.y === 0;
  });
  // Create the browser window.
  windowProcess.mainWindow = new BrowserWindow({
    width: mainDisplay.bounds.width,
    height: mainDisplay.bounds.height,
    x: mainDisplay.bounds.x,
    y: mainDisplay.bounds.y,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true
  });
  windowProcess.mainWindow.loadURL(loadURL);

  // 모니터가 추가, 삭제되면 mainWindow에 신호보내기
  screen.on('display-removed', getDisplays);
  screen.on('display-added', getDisplays);

  // Open the DevTools.
  // isDev && mainWindow.webContents.openDevTools();
};

export function createExtWindow() {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  windowProcess.extWindow = new BrowserWindow({
    kiosk: true,
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

  windowProcess.extWindow.loadURL(`${loadURL}/subMonitor`);

  windowProcess.extWindow.setFullScreenable(false);
  windowProcess.extWindow.on('closed', () => {
    windowProcess.extWindow = null;
  });
}

// receiveMessage('displays', sendDisplays);

export const openExtWindow = () => {
  if (!windowProcess.extWindow) {
    try {
      createExtWindow();
    } catch {
      showNotification({
        title: '화면 열기 오류',
        body: '확장 모니터 확인 필요',
      });
    }
  }
  getDisplays();
};

export const closeExtWindow = () => {
  if (windowProcess.extWindow) {
    windowProcess.extWindow.close();
    windowProcess.extWindow = null;
  }
  getDisplays();
};

export default windowProcess;
