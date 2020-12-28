const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const { makeid } = require('../../utils/AutoMod/AutoMod');
module.exports = class ModerateCommand extends BaseCommand {
    constructor() {
      super('moderate', 'moderation', ['md'], '0');
    }
  
    async run(client, message, args) {
      //console.log(args[0])
        if(!message.member.hasPermission('MANAGE_NICKNAMES, CHANGE_NICKNAME')) return;
       const target = message.mentions.users.first() 
      /* if(!target) {
         return message.reply('Please specify a user')
      }*/
       const member = message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(target.id)
       
        const nick = 'Moderated Nickname ' + makeid()

        await member.setNickname(nick)
 
        message.channel.send(`Moderated User!`)
    }
}