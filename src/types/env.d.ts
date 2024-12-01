interface ImportMetaEnv {
  readonly RSBUILD_ENTRY_URL: string; // RSBUILD_ENTRY_URL 타입을 정의
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
