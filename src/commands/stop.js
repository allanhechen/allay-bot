const { SlashCommandBuilder } = require('discord.js');
const rcon = require('../utils/rcon');
const start = require('../utils/start');
const eventEmitter = require('../utils/events');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the server'),
	async execute(interaction) {
		await interaction.deferReply();

    rcon.connect().then(() => {
      return rcon.send('stop'); // That's a command for Minecraft
    }).then(async res => {
      await interaction.editReply('Stopping the server!');
    }).then(() => {
      return rcon.disconnect();
    }).catch(async err => {
      await interaction.editReply('Server is not running!');
      return;
    });
	},
};