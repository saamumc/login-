import  express  from "express";
import cookieParser from 'cookie-parser';

//Fix para __direname
import path from 'path';
import {fileURLToPath} from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as authentication} from "./controllers/my.controller.js"
import {methods as authorization} from "./middlewares/authorization.js";

//Server
const app = express();
app.set("port",6560);
app.listen(app.get("port"));
console.log("Servidor corriendo en puerto",app.get("port"));

//Configuración
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/pages"));
app.use(express.json());
app.use(cookieParser())


//Rutas
app.get("/",authorization.soloPublico, (get,res)=> res.sendFile(__dirname + "/pages/login.html"));
app.get("/register",authorization.soloPublico,(_req,res)=> res.sendFile(__dirname + "/pages/register.html"));
app.get("/admin",authorization.soloAdmin,(_req,res)=> res.sendFile(__dirname + "/pages/admin/inside.html"));
app.post("/api/login",authentication.login);
app.post("/api/register",authentication.register);