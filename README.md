# Hypixel Guild Bot

[Setup](#setup) | [Commands](#commands) | [Notices](#notices)

An open-source discord bot that interacts with the Hypixel API. Made for [Lobby 55](https://plancke.io/hypixel/guild/name/Lobby%2055) by dwsysfx#9543! Not finished, probably will not be for a while.

## Setup
1. Clone repo
2. Remove `.template` from the `.env` file. Fill in the needed information.
3. `npm i` - Installs dependencies
4. `node .` - Runs bot
> Congrats, you made it.

## Commands
> Please take note that [] means required while <> means optional (arguments)
- `/ping` - Returns the ping of the bot.
- `/verify [IGN]` - Registers you so to the bot, gain guild roles.
- `/unverify` - Unverify yourself, lose guild roles.

## Notices
- [roleUpdater.js](https://https://github.com/dwsysfx/hypixel-guild-bot/blob/main/jobs/roleUpdater.js) needs updating to be used for other guilds.
- [verify.js](https://github.com/dwsysfx/hypixel-guild-bot/blob/main/commands/verify.js) also needs updating for other guilds.
