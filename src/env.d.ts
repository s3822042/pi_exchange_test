interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_ENV: string;
  readonly NG_APP_GIPHY_API_KEY: string;
  readonly NG_APP_GIPHY_API_URL: string;

  [key: string]: any;
}

