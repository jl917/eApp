import { Menu, MenuItemConstructorOptions, MenuItem } from 'electron';

export const genMenu = () => {
  const menus: (MenuItemConstructorOptions | MenuItem)[] = [
    {
      label: 'Item1',
      submenu: [{ label: 'about', role: 'about' }, { label: 'close', role: 'close' }, { label: 'quit', role: 'quit' }],
    },
    { type: 'separator' },
    { label: 'Item2', submenu: [{ label: 'menu2-1' }, { label: 'menu2-2' }] },
  ];

  if (process.platform === 'darwin') {
    menus.unshift({ label: '' });
  }

  Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};
