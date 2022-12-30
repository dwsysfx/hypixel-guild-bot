const fetch = require('node-fetch')
const utils = require('../utils')

// * Soon to be finished!
setInterval(async () => {
    console.log('updating,..')
    let guildData = await utils.getData();
    console.log(guildData);
}, 3000);