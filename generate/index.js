"use strict";

const express = require("express");
const app = express();
const exec = require('child_process').exec;

function randomStringGen(len) {
  let text = "";
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get('/ping', function (_, res) {
  res.send({ success: true });
  res.end();
});

app.get('/generate_gif/:phoneNumber', function (req, res) {
  const number = req.params.phoneNumber;
  if (!number) {
    res.end('Error: no number provided');
  } else {
    console.log('[GENERATE_GIF] Creating gif and sending it to number ' + number);
    exec("bash generate_gif.sh " + number + " " + randomStringGen(5) + " gifs/ camera_output/ ", function (err, stdout, stederr) {
      if (stederr) {
        console.log('[GENERATE_GIF] Generating gif stderr: ' + stederr);
      }
      if (stdout) {
        console.log('[GENERATE_GIF] Generating gif output:');
        console.log(stdout);
      }
      if (err) {
        console.log('[GENERATE_GIF] Error in creating gif: ' + err);

      }
      const success = err ? false : true;
      console.log('[GENERATE_GIF] Finished creating gif with success: ' + success);
      printFiles();
      res.send({ success });
      res.end();
    });
  }
});

app.get('/generate_photo/:photo_path', function (req, res) {
  const photo_path = req.params.photo_path;
  if (!photo_path) {
    res.end('Error: no photo path provided');
  } else {
    console.log('[GENERATE_PHOTO] Adding branding to photo: ' + photo_path);
    exec("bash generate_photo.sh camera_output " + photo_path, function (err, stdout, stederr) {
      if (stederr) {
        console.log('[GENERATE_PHOTO] Generating photo stderr: ' + stederr);
      }
      if (stdout) {
        console.log('[GENERATE_PHOTO] Generating photo output:');
        console.log(stdout);
      }
      if (err) {
        console.log('[GENERATE_PHOTO] Error in creating photo: ' + err);
      }
      const success = err ? false : true;
      res.send({ success });
      res.end();
    });
  }
});

function printFiles() {
  console.log('[GENERATE_GIF] Files in camera_output folder:');
  exec("ls camera_output/ ", function (err, stdout, stederr) {
    if (stederr) {
      console.log('[GENERATE_GIF] Cannot read photos from folder:  ' + stederr);
    }
    if (stdout) {
      console.log(stdout);
    }
    if (err) {
      console.log('[GENERATE_GIF] cannot read photos from folder: ' + err);
    }
  });
}

const port = process.env.GENERATE_GIF_PORT;
if (!port) {
  console.log('[GENERATE] Error: No port provided. Check environment variable: GENERATE_GIF_PORT');
} else {
  console.log('[GENERATE] Listening on port: ' + port);
  app.listen(port);
}
