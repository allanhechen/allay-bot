const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Gets the server\s IP'),
	async execute(interaction) {
    await interaction.deferReply();

    let ip = 'nothing';

    exec('nslookup myip.opendns.com resolver1.opendns.com', async (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      await interaction.editReply(stdout.split('\n')[4]);
    });
	},
};