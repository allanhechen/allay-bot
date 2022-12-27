const { spawn } = require('child_process');
const eventEmitter = require('./events');

module.exports = () => {
  const server = spawn('java', ['-server', '-Xms6G', '-Xmx6G', '-XX:+DisableExplicitGC', '-jar', 'fabric-server-launch.jar', 'nogui'], {
    cwd: 'server',
    detached: true,
    shell: true
  });

  server.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  server.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    eventEmitter.emit('stopped');
  });
};