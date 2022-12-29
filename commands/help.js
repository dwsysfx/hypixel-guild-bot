const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get a list of all the commands.'),
    async execute(interaction) {
        let helpEmbed = new EmbedBuilder()
            .setColor('0x22b5ab')
            .setTitle('Lobby 55 Help')
            .setDescription('Need help? DM OverFallen or Dwsysfx for support.')
            .addFields(
                { name: 'Verify', value: 'To get your guild roles you must connect your Discord to your minecraft account using this bot. To do this run the </verify:1057545909279399988> command.'}
            )
    }
}