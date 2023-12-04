import express from "express";
import { __dirname } from "./utils.js"; //por public
import config from "./config.js";
import "./DAL/db/configDB.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//public
app.use(express.static(__dirname + "/public"));

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});
