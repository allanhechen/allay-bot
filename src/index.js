const fs = require('node:fs');
const path = require('node:path');
const start = require('./utils/start');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token, server_path } = require('./config.json');
const cron = require('node-cron');
const backup = require('./utils/backup');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
start();

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// cron.schedule('* * 5 * *', () => {
//   backup();
// });

setTimeout(() => {
	backup();
}, 10000);

client.login(token);