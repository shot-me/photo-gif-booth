const generateGifConfig = {
  getUrl(number) {
    return 'http://localhost:3003/generate_gif/' + number;
  }
}

const printConfig = {
  getURL(photoName) {
    return 'http://localhost:3003/generate_gif/' + photoName;
  }
};

const config = {
  print: printConfig,
  generateGif: generateGifConfig,
};

module.exports = config;
