const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const { statusMessages, suggestionCache }  = require('../../utils/Functions/suggestion');
module.exports = class SuggestionCommand extends BaseCommand {
    constructor() {
      super('suggestion', 'admin', ['sg'], '0');
    }
  
    async run(client, message, args) {
        if(!message.member.hasPermission('ADMINISTRATOR')) {
            return
        }
    
        const { guild } = message
    
        const messageID = args[0]
        const status = args[1].toUpperCase()
        const reason = args.slice(2).join(' ')
    
        message.delete()
    
        const newstatus = statusMessages[status]
    
        if(!newstatus) {
            message.reply(`Unknown status "${status}", please use ${Object.keys(statusMessages)}`)
            return
        }
    
        const channelId = suggestionCache()[guild.id]
        if(!channelId) {
            message.reply(`An error occurred!`)
            return
        }
    
        const channel = guild.channels.cache.get(channelId)
        if (!channel) {
            message.reply('There was an error finding the suggestion channel!')
            return
        }
    
    
        const targetMessage = await channel.messages.fetch(messageID, false, true)
        if (!targetMessage) {
            message.reply('That message no longer exists')
            return
        }
    
        const oldEmbed = targetMessage.embeds[0]
    
        const embed = new MessageEmbed()
          .setAuthor(oldEmbed.author.name, oldEmbed.author.iconURL)
          .setDescription(oldEmbed.description)
          .setColor(newstatus.color)
          .setFooter('Want to suggest something? Simply type it in this channel')
    
          if (oldEmbed.fields.length === 2) {
              embed.addFields(oldEmbed.fields[0], {
                  name: 'Status',
                  value: `${newstatus.text}\n${reason ? ` Reason: ${reason}` : ''}`
              })
          } else {
            embed.addFields({
                name: 'Status',
                value: `${newstatus.text}\n${reason ? ` Reason: ${reason}` : ''}`
            })
          }
    
          targetMessage.edit(embed)
    }
}