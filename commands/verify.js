const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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

        if (playerLinks.links.DISCORD !== `${interaction.user.username}#${interaction.user.discriminator}`) {
            let noLinkEmbed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('The player you want to link with doesn\'t have their Discord account linked on Hypixel!')
                .setDescription('To link your account, follow the steps in the video below.')
                .setImage('https://i.imgur.com/yyrDttU.gif')
                .setFooter({ text: `${interaction.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
                .setTimestamp()
            return interaction.reply({ embeds: [noLinkEmbed] })
        }

        // * Get the data of the guild being requested. Can be expanded to be used with multiple guilds, but seeing as this is for one, what's the point.
        let playerData = null;
        let guildStats = await fetch(`https://api.slothpixel.me/api/guilds/name/Lobby%2055`)
            .then(response => response.json())

        // * After getting the data, we loop through and see if any member matches.
        let guildMembers = guildStats.members;
        guildMembers.filter(async function(data){
            if (data.uuid == uuid) {
                playerData = data;
            }
        })
    
        // * If no member matches, return an error, otherwise give the specified role.
        if (playerData === null) {
            let linkFailure = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle(`Failed to link to ${uuidLookup.name}`)
                .setDescription(`You are not in that guild, join it to be able to verify!`)
                .setThumbnail(`https://mc-heads.net/head/${uuid}`)
                .setFooter({ text: `${interaction.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
                .setTimestamp()
            return interaction.reply({ embeds: [linkFailure] })
        } else {
            if (playerData.rank === 'Member') {
                interaction.member.roles.add('1043703755880800346')
            } else if (playerData.rank === 'Chill') {
                interaction.member.roles.add('1043703819172839484')
            }
        }

        // * Insert the data into MongoDB, then return an embed to say what happened.
        try {
            let result = await utils.insertData(interaction.user, playerData.uuid, playerData.rank)
            if (result.acknowledged === true) {
                let linkSuccess = new EmbedBuilder()
                    .setColor(0x32CD32)
                    .setTitle(`Successfully linked to ${uuidLookup.name}`)
                    .setDescription('You are now linked, it will take some \ntime to get your guild roles.')
                    .setThumbnail(`https://mc-heads.net/head/${uuid}`)
                    .setFooter({ text: `${interaction.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
                    .setTimestamp()
                interaction.reply({ embeds: [linkSuccess] });
            }
        } catch (error) {
            if (error.message.includes('duplicate key error collection')) {
                let linkFailure = new EmbedBuilder()
                    .setColor(0xFF0000)
                    .setTitle(`Failed to link to ${uuidLookup.name}`)
                    .setDescription(`You are already linked to ${uuidLookup.name}. Run the command \`/unverify\` to unlink your account.`)
                    .setThumbnail(`https://mc-heads.net/head/${uuid}`)
                    .setFooter({ text: `${interaction.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
                    .setTimestamp()
                return interaction.reply({ embeds: [linkFailure] });
            }
        }
    }
}