const { EmbedBuilder } = require('discord.js');
require('dotenv/config');
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI);
client.connect().then(console.log('Connected to MongoDB in utils!'));

module.exports = {
    getData: () => {
        return client.db('hypixel-guild-bot')
            .collection('lobby-55')
            .find();
    },

    insertData: (user, uuid, rank) => {
        return client.db('hypixel-guild-bot')
            .collection('lobby-55')
            .insertOne({
                _id: user.id,
                uuid: uuid,
                rank: rank,
            });
    },

    removeData: (user) => {
        return client.db('hypixel-guild-bot')
           .collection('lobby-55')
           .deleteOne({ _id: user.id });
    },

    Error: (d, user) => {
        return new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('Error!')
            .setDescription(d)
            .setFooter({ text: `${user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}` })
            .setTimestamp()
    },

    Success: (d, user) => {
        return new EmbedBuilder()
           .setColor(0x32CD32)
           .setTitle('Success!')
           .setDescription(d)
           .setFooter({ text: `${user.username}`, iconURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}` })
           .setTimestamp()
    }
}