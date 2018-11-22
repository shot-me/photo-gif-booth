var mkdirp = require("mkdirp");

var fs = require("fs");
var request = require("request");

var SENDING_GIF_INTERVAL = 5000;
var SECURE_CODE = 856324;
var GIF_DIRECTORY = "./gifs/";

var API_URL = "http://cedc.gif-me.pl";

var SMS_POST = "/sms/";
var START_CHECKING_AGAIN = true;
var http = require("http");

var getPhone = function (file_name) {
  file_name = String(file_name);
  var l = file_name.length;
  return file_name.substring(6, l - 4);
};

var checkFileSize = function (path) {
  var stats = fs.statSync(path);
  var fileSizeInBytes = stats["size"];
  if (fileSizeInBytes == 0) return false;
  else return true;
};

var setSendingGifInterval = function () {
  console.log("Start sending gif to Backend to " + API_URL);
  mkdirp(GIF_DIRECTORY, function (err) {
    if (err) console.log(err);
  });
  setInterval(sendAllGif, SENDING_GIF_INTERVAL);
};

var exists = function (tab, gif_id) {
  for (var i = 0; i < tab.length; ++i) {
    if (tab[i] === gif_id) return true;
  }
  return false;
};

async function getGifsOnServer() {
  return new Promise(function (resolve) {
    http.get(API_URL + "/last/gifs", function (res) {
      var body = "";
      res.on("data", function (chunk) {
        body += chunk;
      });
      res.on("end", function () {
        resolve(JSON.parse(body));
      });
    });
  });
}

var sendAllGif = async function () {
  require("dns").resolve("www.google.com", function (err) {
    if (err) {
      console.log("No internet onnection");
      process.exit(1);
    }
  });

  if (START_CHECKING_AGAIN) {
    START_CHECKING_AGAIN = false;
    var gifArray = getGifs().filter(name => name != ".keep");
    try {
      var gifs = await getGifsOnServer();
      gifs = gifs.map(function (x) {
        return x.substring(0, 5);
      });
      console.log("[Send.js] GIFs on server: " + gifs);
      console.log("[Send.js] Number of GIFs on server: " + gifs.length);
      console.log("[Send.js] GIFs on box: " + gifArray);
      console.log("[Send.js] Number of GIFs on box: " + gifArray.length);
      for (var i = 0; i < gifArray.length; i++) {
        var gif_id = gifArray[i].substring(0, 5);
        if (exists(gifs, gif_id)) {
          continue;
        } else {
          console.log("[Send.js] Sending gif " + gif_id + " to server");
          if (checkFileSize(GIF_DIRECTORY + gifArray[i])) {
            await makeSmsPostRequest(
              gif_id,
              SMS_POST,
              gifArray[i],
              getPhone(gifArray[i])
            );
          }
        }
      }
      START_CHECKING_AGAIN = true;
    } catch (err) {
      console.log(err);
    }
  } else console.log("Previous interval is still running...");
};

var getGifs = function () {
  return fs.readdirSync(GIF_DIRECTORY);
};

var makeSmsPostRequest = function (gifId, urlEnding, gifName, telephone) {
  return new Promise(function (resolve) {
    var req = request.post(
      {
        url: API_URL + urlEnding,
        qs: {
          code: SECURE_CODE,
          telephone: telephone,
          client: "kaktus"
        }
      },
      function (err, httpResponse, body) {
        if (err) {
          return resolve(err);
        } else if (httpResponse.statusCode == 400) {
          return resolve(body.errorDescription);
        } else {
          return resolve(undefined, httpResponse, body);
        }
      }
    );
    var form = req.form();
    form.append("file", fs.createReadStream(GIF_DIRECTORY + gifName));
    form.append("id", gifId);
  });
};

module.exports = {
  setSendingGifInterval: setSendingGifInterval
};
