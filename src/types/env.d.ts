declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    NEXT_PUBLIC_SERVER_URL: string;
    NEXT_PUBLIC_LOCAL_STORAGE_KEY: string;
    NEXT_PUBLIC_ASSETS_DIR: string;
    BUILD_STATIC_EXPORT: string;
    NEXT_PUBLIC_JWT_SECRET_KEY: string;
    NEXT_PUBLIC_AES_SECRET_KEY: string; // May using or not?
  }
}
