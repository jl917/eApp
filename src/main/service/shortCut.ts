import { globalShortcut } from 'electron';

export const initShortCut = () => {
  globalShortcut.register('CommandOrControl+Y', () => {
    console.log(1231234);
  });
};
