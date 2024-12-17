import { ipcMain } from 'electron';
import { receiveMessage, sendMessage } from '../utils/bridge';

const channels = new Set([
  'version',
  'displays',
  'open-ext-window',
  'close-ext-window',
  'deeplink',
  // 'no-channel',
]);

export const communication = () => {
  ipcMain.on('wrapped-ipc', (event, { channel, data }) => {
    receiveMessage(channel, () => {
      sendMessage(channel, channels.has(channel) ? data : { error: true });
    });
  });
};
