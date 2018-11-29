const productionIp = 'http://192.168.99.100:3002/';
const devIp = 'http://localhost:3002/';
const isProduction = true;

function getBackendIp() {
  return isProduction ? productionIp : devIp;
}

export const backendUrl = getBackendIp;
export const photoUrl = backendUrl + '/camera_output/';
