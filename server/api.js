var express = require('express');
var router = express.Router();

var fs = require('fs'),
    path = require('path');

function getMostRecentFileNames(dir) {
    if (!dir) {
        console.log('WEB_APP] Error with get most recent file names. Probably your path to camera output is invalid');
    }
    var files = fs.readdirSync(dir);
    return files.filter(fileName => fileName != '.DS_Store').sort(function (a, b) {
        const fullApath = path.join(dir, a);
        const fullBpath = path.join(dir, b);
        return fs.statSync(fullBpath).ctime - fs.statSync(fullApath).ctime;;
    })
}

/* initRouter create router with endpoint getLatestPhotos.url return list of recent photos */
function initRouter(config) {
    const { photosDir, nrOfFramesFromCamera } = config;
    if (!photosDir) {
        console.log('[ERROR WEB_APP] Cannot initialize express router - invalid path to photos');
    }
    router.get('/getLatestPhotos', function (req, res) {
        res.send({ photos: getMostRecentFileNames(photosDir).slice(0, nrOfFramesFromCamera) });
        res.end();
    });
    return router;
}
module.exports = initRouter;