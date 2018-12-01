"use strict";

const express = require("express");
const app = express();
const config = require("./config");
const axios = require('axios')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

function isPrinterServiceUp() {
  const pingUrl = config.printService.getPingUrl();
  return new Promise(function (resolve, reject) {
    axios.get(pingUrl)
      .then(function () {
        resolve(true)
      })
      .catch(function () {
        resolve(false);
      })
  })
}

function isGeneratingServiceUp() {
  const pingUrl = config.generateService.getPingUrl();
  return new Promise(function (resolve, reject) {
    axios.get(pingUrl)
      .then(function () {
        resolve(true)
      })
      .catch(function () {
        resolve(false);
      })
  })
}

app.get('/', function (req, res) {
  Promise.all([
    isPrinterServiceUp(),
    isGeneratingServiceUp()
  ])
    .then(function ([printerUp, generatorUp]) {
      const status = {
        printerUp,
        generatorUp
      }
      res.send(status);
      res.end();
    })
    .catch(function (err, berr) {
      const status = {
        printerUp: false,
        generatorUp: false
      }
      res.send(status);
      res.end();
    })
});


const port = 3005;
if (!port) {
  console.log('[TEST] Error: No port provided');
} else {
  console.log('[TEST] Listening on port: ' + port);
  app.listen(port);
}
