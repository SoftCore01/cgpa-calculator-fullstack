import express, { json, urlencoded } from "express";
import session, { MemoryStore } from "express-session";
import * as dotenv from "dotenv";
import routes from "./routers/index.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 4000;
const SESSION_SECRET =
  process.env.SESSION_SECRET || "Jumped over the lazy horse";
const COOKIE_NAME = process.env.COOKIE_NAME;
const app = express();

app.set("trust proxy", 1)
  app.use(
    cors({
      credentials: true,
      origin: true,
    }),
    json(),
    session({
      secret: SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      name: COOKIE_NAME,
      cookie: {
        maxAge: 60000 * 60,
        httpOnly: false,
        secure: false
      },
      rolling: true
    }),
    routes
  );

/* app.get("/", (req, res) => {
  console.log("Hello world");
  req.session.user = {username: "sf", email:'erv', password:'efe'};
  res.status(200).send({ msg: "Hello, world" });
}); */

app.listen(PORT, () => {
  console.log(`This application is running on Port:${PORT}`);
});
