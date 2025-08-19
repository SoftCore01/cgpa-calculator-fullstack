declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    API_KEY: string;
    PORT: string;
    COOKIE_SECRET: string;
    COOKIE_NAME: string;
    SESSION_SECRET: string;
    MONGODB_USERNAME: string;
    MONGODB_PASSWORD: string;
    MONGODB_CONNECTION_URL: string;
  }
}
