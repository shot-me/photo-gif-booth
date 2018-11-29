const productionIp = 'http://192.168.99.100:3002/';
const devIp = 'http://localhost:3002/';

export function getBackendIp() {
  const isProduction = process.env.NODE_ENV === 'production';
  return isProduction ? productionIp : devIp;
}

export const photoUrl = getBackendIp() + 'camera_output/';
