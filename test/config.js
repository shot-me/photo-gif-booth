const productionIp = 'http://192.168.99.100';
const devIp = 'http://localhost';

function getBackendIp() {
  const isProduction = process.env.NODE_ENV === 'production';
  return isProduction ? productionIp : devIp;
}

const testService = {
  port: 3005,
  getTestIp() {
    return getBackendIp() + ':' + testService.port
  }
}

const generateService = {
  port: 3003,
  getGenerateGifUrl(number) {
    return getBackendIp() + ':' + generateService.port + '/generate_gif/' + number;
  },
  getGeneratePhotoUrl(photoPath) {
    return getBackendIp() + ':' + generateService.port + '/generate_photo/' + photoPath;
  },
  getPingUrl() {
    return getBackendIp() + ':' + generateService.port + '/ping/';
  }
};

const printService = {
  port: 3004,
  getPrintUrl(photoName) {
    return 'http://localhost:3004/print/' + photoName;
  },
  getPingUrl() {
    return 'http://localhost:3004/ping/';
  },
};

function isPrinterServiceUp() {
  const pingUrl = config.printService.getPingUrl();
  return new Promise(function (resolve, reject) {
    fetch(pingUrl)
      .then(function () {
        resolve(true)
      })
      .catch(function () {
        resolve(false);
      })
  })
}

function isGeneratingServiceUp() {
  const pingUrl = config.generateService.getPingUrl();
  return new Promise(function (resolve, reject) {
    fetch(pingUrl)
      .then(function () {
        resolve(true)
      })
      .catch(function () {
        resolve(false);
      })
  })
}

const isUp =
  (function () {
    return Promise.all([
      isPrinterServiceUp(),
      isGeneratingServiceUp()
    ])
      .then(function ([printerUp, generatorUp]) {
        const status = {
          printerUp,
          generatorUp
        }
        return status;
      })
      .catch(function (err, berr) {
        const status = {
          printerUp: false,
          generatorUp: false
        }
        return status;
      })
  })

const config = {
  printService,
  generateService,
  testService,
  isUp
};

module.exports = config;
