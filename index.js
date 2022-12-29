// * Require necessary files.
const { Client, GatewayIntentBits, Collection, REST, Routes, ActivityType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const roleUpdate = require('./jobs/roleUpdater')

require('dotenv').config()

// * Set up permission and partials.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

// * Read commands.
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// * Execute commands.
client.on('interactionCreate', async interaction => {
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

// * Notify you when the bot is ready.
client.on("ready", () => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
	client.user.setPresence({
		activities: [{ name: `/verify | by dwsysfx#9543`, type: ActivityType.Playing }],
		status: 'online',
	  });
	  
    // * Register Commands
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
    	const command = require(`./commands/${file}`);
    	commands.push(command.data.toJSON());
    }

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    (async () => {
    	try {
    		// * Refresh all commands in the guild.
    		const data = await rest.put(
    			Routes.applicationCommands(process.env.CLIENT_ID),
    			{ body: commands },
    		);
    		console.log(`SUCCESSFULLY RELOADED ${data.length} APPLICATION (/) COMMANDS`);
    	} catch (error) {
    		console.error(error);
    	}
    })();
});

// * Login to Discord
client.login(process.env.TOKEN);