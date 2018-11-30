const productionIp = 'http://192.168.99.100';
const devIp = 'http://localhost';

function getBackendIp() {
  const isProduction = process.env.NODE_ENV === 'production';
  return isProduction ? productionIp : devIp;
}

const generateService = {
  port: 3003,
  getGenerateGifUrl(number) {
    return getBackendIp() + ':' + generateService.port + '/generate_gif/' + number;
  },
  getGeneratePhotoUrl(photoPath) {
    return getBackendIp() + ':' + generateService.port + '/generate_photo/' + photoPath;
  },
};

const printService = {
  port: 3004,

  getPrintUrl(photoName) {
    return getBackendIp() + ':' + printService.port + '/print/' + photoName;
  }
};

const config = {
  printService,
  generateService,
  photosDir: 'camera_output'
};

module.exports = config;
