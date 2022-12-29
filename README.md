# Lobby 55 Bot

[Setup](#setup) | [Commands](#commands)

An open-source discord bot that interacts with the Hypixel API. Made for [Lobby 55](https://plancke.io/hypixel/guild/name/Lobby%2055) by dwsysfx#9543!

## Setup
1. Clone repo
2. Create a `.env` file following this template:
```sh
TOKEN= # discord client token 
CLIENT_ID= # bot client id
MONGO_URI= # mongodb url
UPDATE_TIME= # time interval in milliseconds in which roles are updated
```
3. `npm i` - Installs dependencies
4. `node .` - Runs bot
> Congrats, you made it.

## Commands
> Please take note that [] means required while <> means optional (arguments)
- `/ping` - Returns the ping of the bot.
- `/verify [IGN]` - Registers you so to the bot, gain guild roles.
- `/unverify` - Unverify yourself, lose guild roles.  
