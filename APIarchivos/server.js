//*
//Server.js
//se encarga de definir el puerto de la aplicacion y le da la seguridad utilizando cors en express
//y levanta el servidor avisando en consola.log con un listen 
//tambien define la ruta con la cual trabajara (index.js) donde se conservan las routes.
//*/
const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
const initRoutes = require('./routes/index');
app.use(express.urlencoded({ extended: true }));
initRoutes(app);
let port = 8080;

app.listen(port, () => {
  console.log(`Corriendo en :${port}`);
});