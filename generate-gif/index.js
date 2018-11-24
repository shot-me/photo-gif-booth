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

app.get('/generate_gif/:phoneNumber', function (req, res) {
  const number = req.params.phoneNumber;
  if (!number) {
    res.end('Error: no number provided');
  } else {
    console.log('[NODE]: Creating gif and sending it to number ' + number);
    exec("bash generate.sh " + number + " " + randomStringGen(5), function (err, stdout, stederr) {
      if (stederr) {
        console.log('[NODE]: Generating gif stderr: ' + stederr);
      }
      if (stdout) {
        console.log('[NODE]: Generating gif output:');
        console.log(stdout);
      }
      if (err) {
        console.log('[NODE]: Error in creating gif: ' + err);

      }
      const success = err ? false : true;
      console.log('[NODE]: Finished creating gif with success: ' + success);
      res.send({ success });
      res.end();
    });
  }
});

const port = process.env.GENERATE_GIF_PORT;
if (!port) {
  console.log('[GENERATE_GIF] Error: No port provided. Check environment variable: GENERATE_GIF_PORT');
} else {
  console.log('[GENERATE_GIF] Listening on port: ' + port);
  app.listen(port);
}
