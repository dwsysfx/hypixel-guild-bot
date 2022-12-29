const { SlashCommandBuilder } = require('discord.js');
const utils = require('../utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unverify')
        .setDescription('Unlink your Discord and Minecraft accounts'),
    async execute(interaction) {
        let rMember = interaction.guild.roles.cache.get('1043703755880800346')
        let rChill = interaction.guild.roles.cache.get('1043703819172839484')
        try {
            let result = await utils.removeData(interaction.user)
            if (result.acknowledged === true) {
                interaction.member.roles.remove(rMember);
                interaction.member.roles.remove(rChill);
                return interaction.reply({ embeds: [utils.Success(`You are now unlinked, run \`/link\` to relink!`, interaction.user )] });
            }
        } catch (error) {
            console.log(error)
            return interaction.reply({ embeds: [utils.Error('There was an unknown error while trying to unlink your account, please contact the developer.', interaction.user )] })
        }
    }
}