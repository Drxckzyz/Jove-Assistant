require('dotenv').config();
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/Handlers/register');
const database = require('./database/database');
const client = new Client();



(async () => {
    client.commands = new Map();
    client.events = new Map();
    client.cooldowns = new Map();
    client.prefix = process.env.PREFIX;
    await registerCommands(client, '../../commands');
    await registerEvents(client, '../../events');
    await client.login(process.env.TOKEN);
    await database;
})();

process.on('unhandledRejection', e => console.log('Unhandled Rejection: ' + e))
/*
const intents = new Intents([
    Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
    "GUILD_MEMBERS", // lets you request guild members (i.e. fixes the issue)
]);
*/ 
