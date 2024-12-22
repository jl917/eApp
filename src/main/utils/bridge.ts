import windowProcess from '@main/service/window';
import { ipcMain } from 'electron';

type ChannelDataMap = {
  version: string;
  displays: any;
  'open-ext-window': undefined;
  'close-ext-window': undefined;
  deeplink: any;
  message: any;
};

type Channel = keyof ChannelDataMap;

export const sendMessage = <T extends Channel>(
  channel: T,
  data?: ChannelDataMap[T]
) => {
  windowProcess.mainWindow.webContents.send(`${channel}`, data);
};

export const receiveMessage = (channel: Channel, cb: () => void) => {
  ipcMain.on(`${channel}`, cb);
};
