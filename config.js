const generateGifConfig = {
  getUrl(number) {
    return "http://192.168.99.100:3003/generate_gif/" + number;
  }
};

const printConfig = {
  port: 3003,
  getUrl(photoName) {
    return "http://192.168.99.100:3003/print/" + photoName;
  }
};

const config = {
  print: printConfig,
  generateGif: generateGifConfig,
  photosDir: "camera_output"
};

module.exports = config;
