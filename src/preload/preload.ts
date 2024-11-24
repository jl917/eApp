// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

// contextBridge를 사용하여 ipcRenderer를 렌더러 프로세스에 노출
contextBridge.exposeInMainWorld("electron", {
  sendMessage: (channel: string, data: any) => {
    ipcRenderer.send(channel, data);
  },
  receiveMessage: (channel: string, callback: (...args: any) => void) => {
    ipcRenderer.on(channel, (event, ...args) => callback(...args));
  },
});
