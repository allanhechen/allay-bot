const { SlashCommandBuilder } = require('discord.js');
const rcon = require('../utils/rcon');
const start = require('../utils/start');
const eventEmitter = require('../utils/events');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rwhitelist')
		.setDescription('Removes a user from the whitelist')
    .addStringOption(option =>
      option
        .setName('username')
        .setDescription('The username of the player to be removed')),
	async execute(interaction) {
		await interaction.deferReply();

    rcon.connect().then(() => {
      return rcon.send(`whitelist remove ${interaction.options.getString('username')}`); // That's a command for Minecraft
    }).then(async res => {
      await interaction.editReply(res);
    }).then(() => {
      return rcon.disconnect();
    }).catch(async err => {
      await interaction.editReply('Server is not running!');
      return;
    });
	},
};