const { SlashCommandBuilder } = require('discord.js');
const start = require('../utils/start');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Starts the server'),
	async execute(interaction) {
		await interaction.reply('Starting the server!');
    start();
	},
};