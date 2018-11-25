"use strict";

var express = require("express");
var app = express();
var path = require("path");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

if (process.env.NODE_ENV == 'production') {
  console.log("Running production app");
  app.use(express.static(path.join(__dirname, '/build'))); //  "public" off of current is root
}

const camera_output = process.env.CAMERA_OUTPUT;

app.use("/" + camera_output, express.static(__dirname + "/" + camera_output));

const config = {
  photosDir: camera_output,
  nrOfFramesFromCamera: 8
}

app.use('/api', require("./server/api.js")(config));


console.log("[WEB_APP] Application started on port " + process.env.WEB_APP_PORT);
module.exports = app.listen(process.env.WEB_APP_PORT);
