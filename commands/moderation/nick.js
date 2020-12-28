const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
module.exports = class NickCommand extends BaseCommand {
    constructor() {
      super('nickname', 'moderation', ['nick', 'n'], '0');
    }
  
    async run(client, message, args) {
        if(!message.member.hasPermission('MANAGE_NICKNAMES, CHANGE_NICKNAME')) return;
       const target = message.mentions.users.first()
       //if(!target) return message.reply('Please mention a user!')
       const member = message.guild.members.cache.get(args[0]) ? message.guild.members.cache.get(args[0]) : message.guild.members.cache.get(target.id)

       const nick = args.slice(1).join(' ')
       if(!nick) {
         member.setNickname(null)
         message.channel.send('User nick reset!')
         return
       }
       member.setNickname(nick)

       message.channel.send(`Changed ${target.username}'s Nickname to ${nick}`)
    }
}