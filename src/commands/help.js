const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help!'),
	async execute(interaction) {
		await interaction.reply('\
1. Grab the ip with /ip\n\
2. Join the world in minecraft\n\
3. Paste the pinned command in game');
	},
};