//*
//Index.js
//se definen las rutas que se ocuparan 
//y seleccionamos los metodos a ocupar (download upload y el get).
//*/
const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);
  router.get("/data", controller.getData);

  app.use(router);
};

module.exports = routes;