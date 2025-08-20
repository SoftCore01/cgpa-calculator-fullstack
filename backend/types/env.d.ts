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
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;
    REDIS_PORT: string;
    REDIS_HOST: string;
    MONGODB_CONNECTION_URL: string;
  }
}
