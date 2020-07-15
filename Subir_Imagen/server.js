const express = require('express');
const app = express();
const multer= require('multer');
const mimeTypes = require('mime-types');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');


const app2 = express();

//Configurar AWS con claves de Acceso
AWS.config.update({
    accessKeyId: "",
    secretAccessKey: "",
    region: "" 
});
var s3 = new AWS.S3();


//Almacenamiento en disco
//Guarda en el mismo equipo donde se encuentra el disco
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: function(req,file,cb){
        cb("", file.originalname + "." + mimeTypes.extension(file.mimetype));
       // cb("",Date.now()+ file.originalname + "." + mimeTypes.extension(file.mimetype));
    }
})

const upload = multer({
    storage: storage
})

app.get("/",(req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname + "/views/index.html");

})

app.post("/files",upload.single('imagen'),(req,res)=>{
  /*  app2.get("/", (req,res)=>{
        res.send();
  });*/
    res.send("Archivo subido correctamente")
})
//ver si app2 igualar a una variable para guardar la funcion
app.listen(8080,()=> console.log("Server started"));

//app.use(morgan('dev'));

//app2.listen('http://localhost:3001/');
//app2.get("/", function($){$.end("hola desde otro servidor ")})