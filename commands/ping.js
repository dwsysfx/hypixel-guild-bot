const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pong!'),
    async execute(interaction) {
        const sentMessage = await interaction.reply({ content: 'Pinging...', fetchReply: true });
		const pingEmbed = new EmbedBuilder()
			.setColor(0x32cd32)
			.setTitle('Pong :ping_pong:')
			.setDescription('The ping of both the bot and discord api.')
			.setThumbnail('https://media.giphy.com/media/fvA1ieS8rEV8Y/giphy.gif')
			.addFields(
				{ name: 'Uptime', value: `${Math.round(interaction.client.uptime / 60000)}`, inline: true },
				{ name: 'Bot Ping', value: `${sentMessage.createdTimestamp - interaction.createdTimestamp}ms`, inline: true },
				{ name: 'API Ping', value: `${interaction.client.ws.ping}ms`, inline: true },
			)
			.setFooter({ text: `${interaction.user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${interaction.user.id}/${interaction.user.avatar}` })
			.setTimestamp()
		await interaction.editReply({ embeds: [pingEmbed] })
    }
}