"use strict";

var express = require("express");
var app = express();
var exec = require('child_process').exec;

function randomStringGen(len) {
  var text = "";
  var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < len; i++ )
      text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
}

app.get('/', function (req, res) {
  var number = req.query.number;
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

app.listen(3000);
