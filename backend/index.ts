import express, { json } from "express";
import session from "express-session";
import routes from "./routers/index.js";
/* import cors from "cors"; */
import mongoose from "mongoose";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";
import {
  COOKIE_NAME,
  MONGODB_CONNECTION_URL,
  PORT,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USERNAME,
  SESSION_SECRET,
} from "./utils/configs.js";

const app = express();
const redisClient = createClient({
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT,
  },
});

/* const redisClient = createClient({
  url: "redis://localhost:6379",
}); */

redisClient.on("error", (err) => console.error("Redis Client Error", err));
await redisClient.connect();

const redisStore = new RedisStore({
  client: redisClient,
});
mongoose
  .connect(`${MONGODB_CONNECTION_URL}`)
  .then(() => console.log("Database connection established"))
  .catch((err) => console.log(err));

app.set("trust proxy", 1);
app.use(
  /* cors({ //CORS configuration when you want to expose api to any origin 
    credentials: true,
    origin: true,
  }), */
  express.static("frontend"),
  json(),
  session({
    store: redisStore,
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: COOKIE_NAME,
    cookie: {
      maxAge: 60000 * 60,
      httpOnly: false,
      secure: false,
    },
    rolling: true,
  }),
  routes
);

app.get("/signin", (req, res) => {
  res.redirect("/");
});
app.get("/signup", (req, res) => {
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`This application is running on Port:${PORT}`);
});
