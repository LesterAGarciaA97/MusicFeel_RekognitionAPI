const AWS  = require('aws-sdk');
const fs   = require('fs');
const path = require('path');

//configurar AWS con las claves de acceso
AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: ""

    

});

var s3 = new AWS.S3();
var filePath = "./data/file.txt";

//configurar parametros
var params = {
  Bucket : '',
  Body   : fs.createReadStream(filePath),
  Key    : "folder/" + Date.now() + "_" + path.basename(filePath),
  ACL    : 'public-read'
};

s3.upload(params, function (err, data) {
  //en caso de error
  if (err) {
    console.log("Error", err);
  }

  // el archivo se ha subido correctamente
  if (data) {
    console.log("Uploaded in:", data.Location);
  }
});