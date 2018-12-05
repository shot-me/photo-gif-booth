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

console.log('[WEB_APP] Starting node express app in env: ' + process.env.NODE_ENV);
if (process.env.NODE_ENV == 'production') {
  console.log("Running production app");
  app.use(express.static(path.join(__dirname, '/build'))); //  "public" off of current is root
}

const DEFAULT_CAMERA_OUTPUT = 'camera_output';
const camera_output = process.env.CAMERA_OUTPUT || DEFAULT_CAMERA_OUTPUT;

app.use("/" + camera_output, express.static(__dirname + "/" + camera_output));

const config = {
  photosDir: camera_output,
  nrOfFramesFromCamera: 8
}

app.use('/api', require("./server/api.js")(config));

const DEFAULT_PORT = 3002;
const port = process.env.WEB_APP_PORT || DEFAULT_PORT;

console.log("[WEB_APP] Application started on port " + port);
module.exports = app.listen(port);
