const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('guild')
        .setDescription('View details about a guild.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('member')
                .setDescription('View your guild gexp contributions')
                .addStringOption(option =>
                    option.setName('player')
                    .setDescription('The username of the player who you want to link your account with.')
                ),
        ),
    async execute(interaction) {
        return interaction.reply({ embeds: [utils.Error('This command is not finished!', interaction.user)] })
    }
}