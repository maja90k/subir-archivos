//*
//File.controller.js
//Upload se encarga de procesar el archivo recibido desde el file.service en el proyecto de angular
// para asi subirlo con el nombre original con el cual viene el archivo
//GetList llama al directorioen donde fue subido el archivo para asi poder mostrarlo en la tabla.
//Download se encarga directamente de bajar los archivos de la url definida "/files/resources/static/assets/uploads/"
//*
const uploadFile = require("../middleware/upload");
const fs = require("fs");
const path = require("path");
const xlsxFile = require('read-excel-file/node');
const dirPath = path.join(__dirname, '../files/resources/static/assets/uploads/');
let date_ob = new Date();

const getData =  (req, res) => {
  try {
     let variableqla = [];
     xlsxFile(dirPath + 'sample_export.xlsx').then((rows) => {      
      rows.forEach((col)=>{
        col.forEach((data)=>{
          variableqla = data;
          res.status(200).send(variableqla);
        })
      });
    });
  } catch(err) {
    console.log(err);
    res.status(500).send({
      message: `Error getData. ${err}`,
    });
  }
}

const upload = async (req, res) => {  
  try {
    await uploadFile(req, res);
     if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    console.log(err);
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let fechatotal = (date + "-" + month + "-" + year);
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: dirPath + file,
        date: fechatotal,
      });
    });
    res.status(200).send(fileInfos);
  });
};
const download = (req, res) => {
  const fileName = req.params.name;
  res.download(dirPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
  getData,
};