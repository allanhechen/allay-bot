const rcon = require('../utils/rcon');
const eventEmitter = require('./events');
const { spawnSync, execSync } = require('child_process');
const start = require('./start');

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

function execCommand(command) {
  return execSync(command, {
    cwd: `${__dirname}\\..\\server`
  });
}

function save() {
  eventEmitter.removeListener('stopped', save);
  try {
    // console.log(execCommand('cd').toString());
    console.log('add to git');
    execCommand('git add .');
    execCommand('git commit -m "update world"');
    console.log('upload to github')
    execCommand('git push');
  } catch (err) {
    console.error(err);
    return;
  }

  start();
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

