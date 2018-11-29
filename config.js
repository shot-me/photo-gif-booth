const productionIp = 'http://192.168.99.100:3003/';
const devIp = 'http://localhost:3003/';
const isProduction = true;

const getBackendIp = (ip = () => {
  if (isProduction) {
    return productionIp;
  } else {
    devIp;
  }
});

const generateGifConfig = {
  getUrl(number) {
    return getBackendIp + '/generate_gif/' + number;
  }
};

const printConfig = {
  port: 3003,
  getUrl(photoName) {
    return backendIp + '/print/' + photoName;
  }
};

const config = {
  print: printConfig,
  generateGif: generateGifConfig,
  photosDir: 'camera_output'
};

module.exports = config;
