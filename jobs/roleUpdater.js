const fetch = require('node-fetch')
const utils = require('../utils')
require('dotenv/config');


async function roleUpdate() {
    console.log('CALLED')
    let guildStats = await fetch(`https://api.slothpixel.me/api/guilds/name/Lobby%2055`)
        .then(response => response.json())

    let guildMembers = guildStats.members;
    guildMembers.filter(async function(data){
        let savedRank = await utils.getData(data.uuid);
        if (savedRank && data.rank !== savedRank.rank) {
            let user = client.users.cache.get(savedRank._id)
            console.log(user)
            if (data.rank === 'Member') {
                user.roles.add('1043703755880800346');
            } else if (data.rank === 'Chill') {
                user.roles.add('1043703819172839484');
            }
        }
    })
}

setInterval(roleUpdate, 10000)