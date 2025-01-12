import { Menu, nativeImage, Tray } from 'electron';

export const genTrayMenu = () => {
  const icon = nativeImage.createFromPath('../img/trayImage.png');
  let tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { type: 'separator' },
    { label: 'Item3', type: 'radio', checked: true },
    {
      label: 'Item4',
      type: 'submenu',
      submenu: [
        {
          label: 'submenu1',
          type: 'normal',
          click: () => {
            console.log(123123);
          },
        },
      ],
    },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip('TryMenu');
  tray.setTitle('E');
  tray.on('click', () => {
    console.log('click tray');
  });
};
