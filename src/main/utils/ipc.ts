import {
  closeExtWindow,
  openExtWindow,
  windowProcess,
} from '@main/service/window';

type ChannelMain = { type: Channel; data: ChannelCommunicationSuccess };

const typeLimits: Record<Channel, number> = {
  displays: 1,
  version: 1,
  'open-ext-window': 1,
  'close-ext-window': 1,
  deeplink: 2,
  message: 5,
  openExtWindow: 1,
  closeExtWindow: 1,
};

const typeFn: Record<Channel, (...args: any[]) => void | Promise<void>> = {
  openExtWindow,
  closeExtWindow,
  displays: () => {},
  version: () => {},
  'open-ext-window': () => {},
  'close-ext-window': () => {},
  deeplink: () => {},
  message: () => {},
};

export const ipcFnWrap = (
  fn: (...args: any[]) => void | Promise<void>,
  cb: () => void
) => {
  try {
    const result = fn();

    if (result instanceof Promise) {
      result.then(() => cb()).catch(() => cb()); // 에러가 발생해도 cb를 실행
    } else {
      cb();
    }
  } catch {
    cb();
  }
};
export const ipcUtils = (
  event: Electron.IpcMainInvokeEvent,
  { type, data }: ChannelMain
) => {
  // 한도가 없으면
  if (typeLimits[type] === 0) {
    windowProcess.mainWindow.webContents.send('custom-ipc', {
      type,
      error: '채널 한도를 초과했습니다.',
      success: false,
    });
    return '';
  }

  if (typeLimits[type] === undefined) {
    windowProcess.mainWindow.webContents.send('custom-ipc', {
      type,
      error: '지원하지 않는 채널입니다.',
      success: false,
    });
    return '';
  }
  typeLimits[type] -= 1;

  ipcFnWrap(typeFn[type], () => {
    console.log('실행완료');
    windowProcess.mainWindow.webContents.send('custom-ipc', { type, data });
    // typeLimits[type] += 1;
  });
  // typeLimits[type] += 1;
  return '';
};
