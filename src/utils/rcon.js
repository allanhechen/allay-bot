const Rcon = require('modern-rcon');

const rcon = new Rcon('localhost', 'test');

module.exports = rcon;