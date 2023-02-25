const fetch = require('node-fetch')
require('dotenv/config');
 
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URI);
client.connect().then(console.log('Connected to MongoDB in utils!'));
let linkData = '';

// * Soon to be finished!
setInterval(async () => {
		let guildMatch = null;
        let user = '';
        // * Get the data of the guild being requested. Can be expanded to be used with multiple guilds, but seeing as this is for one, what's the point?
        let guildStats = await fetch(`https://api.slothpixel.me/api/guilds/name/Lobby%2055`)
            .then(response => response.json())

        await client.db('hypixel-guild-bot')
            .collection('lobby-55')
            .findOne()
            .then(result => {
            	linkData = JSON.stringify(result);
        })
        console.log(linkData);
  
        // * After getting the data, we loop through and see if any member matches.
        let guildMembers = guildStats.members;
        guildMembers.filter(function(data){
            linkData.filter( function(linkData){
				console.log(linkData.uuid)
				user = client.users.cache.get(linkData._id);
				if (data.uuid === linkData.uuid) {
					guildMatch = linkData.uuid;
				}
			})
			if (guildMatch !== null) {
			    user.roles.add(process.env.ROLE1);
                user.roles.add(process.env.ROLE2);
				guildMatch = null;
			} else {
				user.roles.remove(process.env.ROLE1);
                user.roles.remove(process.env.ROLE2);
			}
        })
    console.log(linkData);
}, 3000);