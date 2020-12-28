const BaseEvent = require('../utils/Handlers/BaseEvent');
const mutes = require('../utils/Functions/mute-func');
const antiad = require('../utils/AutoMod/anti-ad');
const antilinks = require('../utils/AutoMod/anti-links');
const antislurs = require('../utils/AutoMod/anti-slur');
const amutes = require('../utils/Functions/auto-mutefunc');
const suggestion = require('../utils/Functions/suggestion')
module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready')
    }
    async run(client, message) {
        console.log(`${client.user.tag} Has logged in!`)
        client.user.setActivity('Drxckzyz- | +help', { type: 'WATCHING' })
        await mutes(client)
        await antiad(client)
        await antilinks(client)
        await antislurs(client)
        await amutes(client)
        await suggestion(client)
    }
}