import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";


dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

app.use(urlencoded({extended: true}))

app.get('/', (req, res) => {
    console.log("Hello world")
    res.status(200).send({msg: 'Hello, world'})
})

app.listen(PORT, () => {
  console.log(`This application is running on Port:${PORT}`);
});
