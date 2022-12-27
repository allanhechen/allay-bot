const fs = require('node:fs');
let allowed;

fs.readFile('./utils/allowed.txt', 'utf8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }

  allowed = data.split('\n');
});

module.exports = function(user) {
  return allowed.includes(user);
}