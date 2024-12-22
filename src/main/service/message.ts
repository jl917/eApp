import { dialog } from 'electron';
import { receiveMessage } from '@/main/utils/bridge';
import { showNotification } from '../utils/notification';
import windowProcess from './window';

export const systemMessage = () => {
  receiveMessage('message', (e: any, data) => {
    if (data.type === 'notification') {
      showNotification(data.config);
    }

    if (data.type === 'dialog') {
      dialog.showMessageBox(windowProcess.mainWindow, data.config);
    }
  });
};
