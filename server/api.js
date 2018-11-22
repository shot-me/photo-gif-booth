var express = require('express');
var router = express.Router();

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
    return router;
}
module.exports = initRouter;