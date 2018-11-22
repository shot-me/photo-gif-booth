//During the test the env variable is set to test

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index.js");
var fs = require("fs");

chai.use(chaiHttp);
var expect = chai.expect;
var utils = require("../server/utils");

describe("/GET latest photos", () => {
  it("it should generate random string", done => {
    expect(utils.randomStringGen(5).length > 0).to.be.true;
    done();
  });
  it("it should GET the latest photos", done => {
    const sourcePath = "camera_output/1.jpg";
    const newFileName = utils.randomStringGen(5) + ".jpg";
    const newPhotoPath = "camera_output/" + newFileName;
    fs.createReadStream(sourcePath).pipe(fs.createWriteStream(newPhotoPath));

    chai
      .request(server)
      .get("/api/getLatestPhotos")
      .end((err, res) => {
        expect(res.body).to.have.property("photos");
        let photos = res.body.photos;
        expect(photos.length > 1).to.be.true;
        expect(photos[0] == newFileName).to.be.true;
        fs.unlinkSync(newPhotoPath);
        done();
      });
  });
  it("it should generate GIF", done => {
    /*
     * We assume that in folder ./camera_output' there are photos:
     *  1.jpg, 2.jpg, 3.jpg, 4.jpg, 5.jpg from which we will generate gif
     * Also in folder: branding there is file: ramka.png which will be als oon gif
     * The gif should be saved to folder: gifs
     */

    const number = utils.randomStringGen(9);
    chai
      .request(server)
      .get(
        "/api/generateGif?number=" +
          number +
          "&frames=6.jpg%205.jpg%204.jpg%203.jpg%202.jpg%201.jpg"
      )
      .end((err, res) => {
        expect(res.body).to.have.property("success");
        let success = res.body.success;
        expect(success).to.be.true;
        var files = fs.readdirSync("gifs");
        var existGif = files.find(fileName => fileName.indexOf(number) >= 0);
        expect(existGif).not.to.be.undefined;
        done();
      });
  });
});
