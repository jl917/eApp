import { Menu } from 'electron';

export const genMenu = () => {
  const mainMenu = Menu.buildFromTemplate([
    { label: 'Item1', submenu: [{ label: 'menu1-1', role: 'about' }, { label: 'menu1-2' }] },
    { type: 'separator' },
    { label: 'Item2', submenu: [{ label: 'menu2-1' }, { label: 'menu2-2' }] },
  ]);
  Menu.setApplicationMenu(mainMenu);
};
