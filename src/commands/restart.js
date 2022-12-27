const { SlashCommandBuilder } = require('discord.js');
const rcon = require('../utils/rcon');
const start = require('../utils/start');
const eventEmitter = require('../utils/events');

async function restart() {
  eventEmitter.removeListener('stopped', restart);
  start();
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restarts the server'),
	async execute(interaction) {
		await interaction.deferReply();

    rcon.connect().then(() => {
      return rcon.send('stop'); // That's a command for Minecraft
    }).then(async res => {
      await interaction.editReply('Stopping the server!');
    }).then(() => {
      return rcon.disconnect();
    }).then(async () => {
      await interaction.editReply('Starting the server!');
      eventEmitter.on('stopped', restart);
    }).catch(async err => {
      await interaction.editReply('Server is not running!');
      return;
    });
	},
};