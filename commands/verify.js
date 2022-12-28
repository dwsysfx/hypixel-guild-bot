const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const utils = require('../utils')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Link your Hypixel account with your Discord account.')
        .addStringOption(option =>
           option.setName('player')
           .setDescription('The username of the player who you want to link your account with.')
        ),
    async execute(interaction) {
        // * Get the inputted IGN and check if it is valid.
        const player = interaction.options.getString('player');
        const uuidLookup = await fetch(`https://api.minetools.eu/uuid/${player}`)
            .then(response => response.json());

        if (uuidLookup.status === 'ERR') {
            return interaction.reply({ embeds: [utils.Error( 'There is no account with this username!', interaction.user )] });
        } else {
             var uuid = uuidLookup.id;
        }

        // * Here we check if the correct discord account is linked, if so proceed, otherwise return an error.
        let playerLinks = await fetch(`https://api.slothpixel.me/api/players/${uuid}`)
            .then(response => response.json());
        console.log(interaction.user)
        if (playerLinks.links.DISCORD !== `${interaction.user.username}#${interaction.user.discriminator}`) {
            // ! Not done yet!
            let notLinkedEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('The player you want to link with doesn\'t have their Discord account linked on Hypixel!')
                .setDescription('To link your account, follow the steps in the video below.')
                .setFooter({ text: `${interaction.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.id}/${interaction.avatar}` })
                .setTimestamp()
            return interaction.reply({ embeds: [notLinkedEmbed] })
        }

        // * Get the data of the guild being requested. Can be expanded to be used with multiple guilds, but seeing as this is for one, what's the point.
        // * After getting the data, we loop through and see if any member matches, if yes use the data, else return an error.
        let guildStats = await fetch(`https://api.slothpixel.me/api/guilds/name/Lobby%2055`)
            .then(response => response.json())
        let guildMembers = guildStats.members;
        guildMembers.filter(function(data){
            if (data.uuid == uuid) {
                playerData = data;
            } else { playerData = null; }
        })
        console.log(playerData)
        if (playerData === null) {
            return interaction.reply({ embeds: [utils.Error('You aren\'t in this guild!', interaction.user )] })
        }
    }
}