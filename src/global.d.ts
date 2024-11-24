declare interface ElectronAPI {
  sendMessage: (channel: string, data?: any) => void;
  receiveMessage: (channel: string, callback: (...args: any[]) => void) => void;
}

// window 객체에 electron을 추가하는 전역 타입 선언
declare global {
  interface Window {
    electron: ElectronAPI;
  }
}

export {}