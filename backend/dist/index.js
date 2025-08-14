import express, { urlencoded } from "express";
import * as dotenv from "dotenv";
import routes from './routers/index.js';
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
app.use(urlencoded({ extended: true }), routes);
app.get('/', (req, res) => {
    console.log("Hello world");
    res.status(200).send({ msg: 'Hello, world' });
});
app.listen(PORT, () => {
    console.log(`This application is running on Port:${PORT}`);
});
