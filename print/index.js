"use strict";

const express = require("express");
const app = express();
const exec = require('child_process').exec;

const PRINT_SERVICE_PORT = 3004;


var args = process.argv.slice(2);
if (!args || args.length !== 1) {
    console.log('Usage: node print/index.js  ///c/Users/gif/camera_output');
    return;
}

const printFolder = args[1];

function success(res) {
    res.send({ success: true });
    res.end();
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/print/:fileName', function (req, res) {
    const fileName = req.params.fileName;
    const filePath = printFolder + '/' + fileName;
    console.log('[PRINT] Printing photo: ' + filePath);
    //  const rmFiles = ' rm ../' + config.photosDir + '/*';
    exec('cd print && PrintPhoto.exe ' + filePath, function (err) {
        if (err) {
            console.log('[PRINT] ' + err);
        }
    });
    success(res);
});

app.get('/ping', function (_, res) {
    success(res);
});

console.log('[PRINT] Started printing service');
console.log('[PRINT] Listening on port: ' + PRINT_SERVICE_PORT);
app.listen(PRINT_SERVICE_PORT);
