const { SlashCommandBuilder } = require('discord.js');
const rcon = require('../utils/rcon');
const eventEmitter = require('../utils/events');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('exec')
		.setDescription('Run a command as OP')
    .addStringOption(option =>
      option
        .setName('command')
        .setDescription('The command to execute')
        .setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

    rcon.connect().then(() => {
      return rcon.send(interaction.options.getString('command'));
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