const BaseEvent = require('../utils/Handlers/BaseEvent');
const mutes = require('../utils/Functions/mute-func');
const antiad = require('../utils/AutoMod/anti-ad');
const antilinks = require('../utils/AutoMod/anti-links');
const antislurs = require('../utils/AutoMod/anti-slur');
const amutes = require('../utils/Functions/auto-mutefunc');
const suggestion = require('../utils/Functions/suggestion')
const modlogs = require('../utils/Functions/modlogs');
const antipings = require('../utils/AutoMod/anti-ping');
const { MessageEmbed } = require('discord.js')

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready')
    }
    async run(client, message) {
        const logs = client.channels.cache.get(process.env.LOGS)
        console.log(`${client.user.tag} Has logged in!`)
        client.user.setActivity('Drxckzyz- | +help', { type: 'WATCHING' })
        await mutes(client)
        await antiad(client)
       // await antilinks(client)
        await antislurs(client)
        await amutes(client)
        await suggestion(client)
        await modlogs(client)
        await antipings(client)
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Bot online!')
        .setDescription(`Bot is now online\nPing: ${client.ws.ping}`)
        .setTimestamp())
    }
}