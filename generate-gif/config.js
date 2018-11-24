module.exports = {
  port: '3003',
  endpoint() {
    return 'localhost:' + this.port;
  }
}