declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    NEXT_PUBLIC_LOCAL_STORAGE_KEY: string;
  }
}
