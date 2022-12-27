const Rcon = require('modern-rcon');

const rcon = new Rcon('localhost', 'test');

rcon.connect().then(() => {
  return rcon.send('stop'); // That's a command for Minecraft
}).then(res => {
  console.log(res);
}).then(() => {
  return rcon.disconnect();
});