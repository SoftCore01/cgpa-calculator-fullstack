import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000;
const SESSION_SECRET =
  process.env.SESSION_SECRET || "Jumped over the lazy horse";
const COOKIE_NAME = process.env.COOKIE_NAME;
const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_PORT = parseInt(process.env.REDIS_PORT);
const REDIS_HOST = process.env.REDIS_HOST;

export {
  PORT,
  SESSION_SECRET,
  COOKIE_NAME,
  MONGODB_CONNECTION_URL,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USERNAME,
};
