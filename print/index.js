"use strict";

const express = require("express");
const app = express();
const exec = require('child_process').exec;

const PRINT_SERVICE_PORT = 3004;
const PHOTOS_DIR = 'camera_output';
function success(res) {
    res.send({ success: true });
    res.end();
}

app.get('/print/:fileName', function (req, res) {
    const fileName = req.params.fileName;
    const filePath = '../' + PHOTOS_DIR + '/' + fileName;
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
