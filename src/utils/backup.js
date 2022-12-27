const rcon = require('../utils/rcon');
const eventEmitter = require('./events');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function sendMessage(time) {
  rcon.connect().then(() => {
    return rcon.send(`say SERVER RESTARTING IN ${time} MINUTE${time == 1 ? '' : 'S'}`);
  }).then(() => {
    return rcon.disconnect();
  }).catch(async err => {
    console.log(err);
  });
}

function save() {
  eventEmitter.removeListener('stopped', save);
  console.log('saving');
}

module.exports = function() {
  delay(1000)
    .then(() => {
      console.log('1 second has passed');
      sendMessage(10);
      return delay(1000);
    })
    .then(() => {
      console.log('2 seconds have passed');
      sendMessage(5);
      return delay(1000);
    })
    .then(() => {
      console.log('3 seconds have passed');
      sendMessage(1);
      return delay(1000);
    })
    .then(() => {
      eventEmitter.on('stopped', save);
      rcon.connect().then(() => {
        return rcon.send(`stop`);
      }).then(() => {
        return rcon.disconnect();
      }).catch(async err => {
        console.log(err);
      });
    });
};

