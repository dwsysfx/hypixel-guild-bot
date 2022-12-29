const fetch = require('node-fetch')
const utils = require('../utils')
require('dotenv/config');

async function roleUpdate() {
    let guildStats = await fetch(`https://api.slothpixel.me/api/guilds/name/Lobby%2055`)
        .then(response => response.json())

    let guildMembers = guildStats.members;
    guildMembers.filter(async function(data){
        let savedRank = await utils.getData(data.uuid);
        if (savedRank && data.rank !== savedRank.rank) {
            console.log(savedRank.uuid)
            console.log(savedRank._id)
            if (data.rank === 'Member') {
                guild.addMemberRole(savedRank._id, '1043703755880800346')
            } else if (data.rank === 'Chill') {
                guild.addMemberRole(savedRank._id, '1043703819172839484')
            }

        }
    })
}

setInterval(roleUpdate, process.env.UPDATE_TIME)