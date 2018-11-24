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
    // var file = 'C:\\Users\\bzwbk\\heineken\\build\\' + getMostRecentFileName(PHOTO_DIR, req.query.ind);
    const file = config.photosDir + '/' + getMostRecentFileName(PHOTO_DIR, req.query.ind);
    console.log('Printing file: ' + file);
    exec('PrintPhoto.exe ' + file, function(err) {
        if (err) {
            console.log(err);
        }
    });
    res.end();
});

app.get('/ping', function (req, res) {
    res.send({success: true});
    res.end();
});

app.listen(config.ports.print);
