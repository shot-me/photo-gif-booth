"use strict";

var express = require("express");
var app = express();
var path = require("path");
var config = require("./config");

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

app.use("/camera_output", express.static(__dirname + "/camera_output"));

app.use(config.backendRoute, require("./server/api.js")(config));
//require("./server/send.js").setSendingGifInterval();

console.log("[WEB_APP] Application started on port " + process.env.WEB_APP_PORT);
module.exports = app.listen(process.env.WEB_APP_PORT);
