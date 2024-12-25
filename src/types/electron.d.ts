declare interface ElectronAPI {
  sendMessage: (channel: Channel, data?: any) => void;
  receiveMessage: (
    channel: Channel,
    callback: (...args: any[]) => void
  ) => void;
  safeSend: (channel: Channel, data?: any) => void;
}

declare interface ElectronAPI2 {
  sendMessage: (type, data?: any) => void;
}

// window 객체에 electron을 추가하는 전역 타입 선언
declare global {
  interface Window {
    electron: ElectronAPI;
    api: ElectronAPI2;
  }
}

export {};
