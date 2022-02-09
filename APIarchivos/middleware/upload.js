//*
//Upload.js
//aqui se ocupa multer y se define el peso maximo del archivo a subir
// por lo tanto en este caso no mayor a 50mb. esto es aplicable a la ruta de subias "../files/resources/static/assets/uploads/"
//*/

const util = require("util");
const multer = require("multer");
const path = require("path");
const maxSize = 2 * 1024 * 1024;
const dirPath = path.join(__dirname, '../files/resources/static/assets/uploads/');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

var uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

var uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;