const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const suggest = require('../../database/models/suggest-schemas');
const { fetchSuggestionchannels } = require('../../utils/Functions/suggestion');
module.exports = class SetSuggestionChannelCommand extends BaseCommand {
    constructor() {
      super('setsuggesstionchannel', 'admin', ['stgc'], '0');
    }
  
    async run(client, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return m
        }

        const channel = message.mentions.channels.first() || message.channel
  
        const {
            guild: { id: guildid }
        } = message
       const { id: channelid } = channel
  
        await suggest.findOneAndUpdate({
            _id: guildid
        }, {
            _id: guildid,
            channelId: channelid
        }, {
            upsert: true
        })
  
        message.reply(`Channel = ${channel}`).then(msg => {
            msg.delete({ timeout: 25001 })
            message.delete({ timeout: 2500 })
        })
  
        fetchSuggestionchannels(guildid)
    }
}