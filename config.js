const productionIp = 'http://192.168.99.100:3003/';
const devIp = 'http://localhost:3003/';
const isProduction = true;

function getBackendIp() {
  return isProduction ? productionIp : devIp;
}

const generateGifConfig = {
  getUrl(number) {
    return getBackendIp() + '/generate_gif/' + number;
  }
};

const printConfig = {
  port: 3003,
  getUrl(photoName) {
    return getBackendIp() + '/print/' + photoName;
  }
};

const config = {
  print: printConfig,
  generateGif: generateGifConfig,
  photosDir: 'camera_output'
};

module.exports = config;
