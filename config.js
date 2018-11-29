const backendUp = "http://192.168.99.100:3003/";

const generateGifConfig = {
  getUrl(number) {
    return backendUp + "/generate_gif/" + number;
  }
};

const printConfig = {
  port: 3003,
  getUrl(photoName) {
    return backendUp + "/print/" + photoName;
  }
};

const config = {
  print: printConfig,
  generateGif: generateGifConfig,
  photosDir: "camera_output"
};

module.exports = config;
