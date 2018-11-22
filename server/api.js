var express = require('express');
var router = express.Router();

var sys = require('sys')
var exec = require('child_process').exec;
var utils = require('../server/utils');

var fs = require('fs'),
    path = require('path');

function getMostRecentFileNames(dir) {
    var files = fs.readdirSync(dir);
    console.log(dir);
    return files.filter(fileName => fileName != '.DS_Store').sort(function (a, b) {
        const fullApath = path.join(dir, a);
        const fullBpath = path.join(dir, b);
        return fs.statSync(fullBpath).ctime - fs.statSync(fullApath).ctime;;
    })
}

/* initRouter create router with endpoint getLatestPhotos.url return list of recent photos */
function initRouter(config) {
    const { getLatestPhotosUrl, generateGifUrl, photosDir, nrOfFramesFromCamera } = config;
    router.get(getLatestPhotosUrl, function (req, res) {
        res.send({ photos: getMostRecentFileNames(photosDir).slice(0, nrOfFramesFromCamera) });
        res.end();
    });
    router.get(generateGifUrl, function (req, res) {
        var number = req.query.number;
        console.log('[NODE]: Creating gif and sending it to number ' + number);
        exec("bash scripts/create_gif.sh " + req.query.number + " " + utils.randomStringGen(5) + " " + req.query.frames, function (err, stdout, stederr) {
            if (stederr) {
                console.log('[NODE]: Generating gif stderr: ' + stederr);
            }
            if (stdout) {
                console.log('[NODE]: Generating gif output: ' + stdout);
            }
            if (err) {
                console.log('[NODE]: Error in creating gif: ' + err);

            }
            const success = err ? false : true;
            console.log('[NODE]: Finished creating gif with success: ' + success);
            res.send({ success });
            res.end();
        });

    });

    return router;
}
module.exports = initRouter;