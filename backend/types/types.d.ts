declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    API_KEY: string;
    PORT: string;
  }
}
