import { globalShortcut } from 'electron';

export const initShortCut = () => {
  console.log(globalShortcut.isRegistered('CommandOrControl+Y'));
  globalShortcut.register('CommandOrControl+Y', () => {
    console.log(123123);
  });
};
