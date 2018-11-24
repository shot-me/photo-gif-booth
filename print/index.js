"use strict";

const express = require("express");
const app = express();
const exec = require('child_process').exec;
const fs = require('fs');
const config = require('../config');

function getMostRecentFileName(dir, ind = 0) {
    const files = fs.readdirSync(dir).sort(function(a, b){
        return a.time - b.time;
    });
    return files[ind];
}

app.get('/print', function (req, res) {
    const file = config.photosDir + '/' + getMostRecentFileName(config.photosDir, req.query.ind);
    console.log('[PRINT] Printing photo: ' + file);
    exec('cd print && PrintPhoto.exe ' + '../' + file, function(err) {
        if (err) {
            console.log('[PRINT] ' + err);
        }
    });
    res.end();
});

app.get('/ping', function (req, res) {
    res.send({success: true});
    res.end();
});

console.log('[PRINT] Started printing service');
console.log('[PRINT] Listening on port: ' + config.ports.print);
app.listen(config.ports.print);
