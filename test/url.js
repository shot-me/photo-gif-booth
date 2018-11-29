import { getBackendIp } from './../src/components/shot-me/photos';
import config from './../config';

const expect = require('chai').expect;

describe('backend url', () => {
  it('it should return productionIp = 192.168.99.100:3002', () => {
    process.env.NODE_ENV = 'production';
    expect(getBackendIp()).to.equal('http://192.168.99.100:3002/');
  });

  it('it should return dev generate-gif url = localhost:3003', () => {
    process.env.NODE_ENV = 'dev';
    expect(config.generateGif.getUrl('12345')).to.equal(
      'http://localhost:3003/generate_gif/12345'
    );
  });

  it('it should return production generate-gif url = 192.168.99.100:3003:3002', () => {
    process.env.NODE_ENV = 'production';
    expect(config.generateGif.getUrl('12345')).to.equal(
      'http://192.168.99.100:3003/generate_gif/12345'
    );
  });

  it('it shoul return production photo url = 192.168.99.100', () => {
    process.env.NODE_ENV = 'production';
    expect(config.print.getUrl('12345')).to.equal(
      'http://192.168.99.100:3003/print/12345'
    );
  });

  it('it shoul return dev photo url = localhost', () => {
    process.env.NODE_ENV = 'dev';
    expect(config.print.getUrl('12345')).to.equal(
      'http://localhost:3003/print/12345'
    );
  });
});
