import express from "express";
import cookieParser from "cookie-parser";
import config from "./config.js";
import "./DAL/db/configDB.js";
import viewsRoutes from "./routes/views.routes.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import methodOverride from "method-override";
import { createRoles } from "./libs/initialSetup.js";

//import por public
import { __dirname } from "./utils.js";

//El modulo que tuve que instalar de handlebars para que me tomara los objetos handlebars
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import exphbs from "express-handlebars";
import handlebars from "handlebars";

const app = express();
createRoles();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie-parser
app.use(cookieParser());

//method-Override
app.use(methodOverride("_method"));

//public
app.use(express.static(__dirname + "/public"));

//handlebarss
app.engine(
  "handlebars",
  exphbs.engine({ handlebars: allowInsecurePrototypeAccess(handlebars) })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//routes
app.use("/api/", viewsRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

//puerto
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`escuchando al puerto ${PORT}`);
});
