/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENTRY_URL: string; // VITE_ENTRY_URL 타입을 정의
  // 다른 환경 변수를 추가하고 싶다면 아래에 계속 정의하면 됩니다.
  // readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
