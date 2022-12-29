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
                { name: 'Verify', value: 'To get your guild roles you must connect your Discord to your minecraft account using this bot. To do this run the `/verify\` command.' },
                { name: '‎', value: '‎', inline: true},
                { name: 'Unverify', value: 'To unlink your account and remove your data you can run the command \`/unverify\`' },
                { name: '‎', value: '‎', inline: true},
                { name: 'Ping', value: 'Pong! Get the ping of the bot and the DJS api.' }
            )
            .setFooter({ text: `${interaction.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
            .setTimestamp()
        interaction.reply({ embeds: [helpEmbed] })
    }
}