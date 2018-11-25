const generateGifConfig = {
  getUrl(number) {
    return 'http://localhost:3003/generate_gif/' + number;
  }
}

const printConfig = {
  port: 3003,
  getUrl(photoName) {
    return 'http://localhost:3003/print/' + photoName;
  }
};

const config = {
  print: printConfig,
  generateGif: generateGifConfig,
  photosDir: 'camera_output'
};

module.exports = config;
