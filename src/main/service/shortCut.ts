import { globalShortcut } from 'electron';

export const initShortCut = () => {
  globalShortcut.register('CommandOrControl+Y', () => {
    console.log(123123);
  });
};
