import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import * as dotenv from "dotenv";
import routes from "./routers/index.js";


dotenv.config();

const PORT = process.env.PORT || 4000;
const COOKIE_SECRET = process.env.COOKIE_SECRET || "A quick black fox 12345";
const SESSION_SECRET =
  process.env.SESSION_SECRET || "Jumped over the lazy horse";
const COOKIE_NAME = process.env.COOKIE_NAME
const app = express();

app.use(
  urlencoded({ extended: true }),
  cookieParser(COOKIE_SECRET),
  session({
    secret: SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    name: COOKIE_NAME,
    cookie: {
      maxAge: 60000 * 60 * 2,
    },
  }),
  routes
);



app.get("/", (req, res) => {
  console.log("Hello world");
  res.status(200).send({ msg: "Hello, world" });
});


app.listen(PORT, () => {
  console.log(`This application is running on Port:${PORT}`);
});
