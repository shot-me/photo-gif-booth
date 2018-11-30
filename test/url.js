import { getWebappIp } from './../src/components/shot-me/photos';
import config from './../config';

const expect = require('chai').expect;

describe('backend url', () => {
  it('it should return productionIp = 192.168.99.100:3002', () => {
    process.env.NODE_ENV = 'production';
    expect(getWebappIp()).to.equal('http://192.168.99.100:3002/');
  });

  it('it should return dev generate-gif url = localhost:3003', () => {
    process.env.NODE_ENV = 'dev';
    expect(config.generateService.getGenerateGifUrl('12345')).to.equal(
      'http://localhost:3003/generate_gif/12345'
    );
  });

  it('it should return production generate-gif url = 192.168.99.100:3003:3002', () => {
    process.env.NODE_ENV = 'production';
    expect(config.generateService.getGenerateGifUrl('12345')).to.equal(
      'http://192.168.99.100:3003/generate_gif/12345'
    );
  });

  it('it shoul return production photo url = 192.168.99.100', () => {
    process.env.NODE_ENV = 'production';
    expect(config.printService.getPrintUrl('12345')).to.equal(
      'http://192.168.99.100:3004/print/12345'
    );
  });

  it('it shoul return dev photo url = localhost', () => {
    process.env.NODE_ENV = 'dev';
    expect(config.printService.getPrintUrl('12345')).to.equal(
      'http://localhost:3004/print/12345'
    );
  });
  it('it shoul return dev generate photo url  = localhost', () => {
    process.env.NODE_ENV = 'dev';
    expect(config.generateService.getGeneratePhotoUrl('12345')).to.equal(
      'http://localhost:3003/generate_photo/12345'
    );
  });
});
