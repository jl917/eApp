import { app, shell } from 'electron';
import path from 'path';
import { receiveMessage } from '@main/utils/bridge';

if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('e-app', process.execPath, [
      path.resolve(process.argv[1]),
    ]);
  }
} else {
  app.setAsDefaultProtocolClient('e-app');
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

receiveMessage('shell:open', () => {
  const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked');
  const pagePath = path.join('file://', pageDirectory, 'index.html');
  shell.openExternal(pagePath);
});
