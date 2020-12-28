const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const warnmodel = require('../../database/models/warn-Schema');

module.exports = class RemovewarnCommand extends BaseCommand {
    constructor() {
      super('removewarn', 'moderation', ['dw', 'rw', 'delw'], '0');
    }
  
    async run(client, message, args) {
        const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.channel.send('According to the server statistics You\'re not a moderator!!')
    }
    else if (!mentionedMember) {
        return message.channel.send('Moderator 101: Mention a user!!!!')
    }

    const warnDoc = await warnmodel.findOne({
        userID: mentionedMember.id,
    }).catch(err => console.log(err))

  if (!warnDoc || !warnDoc.warningID.length) {
      return message.channel.send('This user doesn\'t have any warnings!')
  }

  if (!warnDoc || !warnDoc.warningID.length) {
    return message.channel.send('This user doesn\'t have any warnings!')
}

 const warningID = parseInt(args[1])

  if (warningID <= 0 || warningID > warnDoc.warningID.length) {
     return message.channel.send('This is an invalid warning id')
 }

 warnDoc.warningID.splice(warningID - 1, warningID !== 1 ? warningID - 1 : 1)

 await warnDoc.save().catch(err => console.log(err))
 
    

    message.channel.send(new MessageEmbed()
    .setColor('BLUE')
    .setDescription(`Removed Warn from ${mentionedMember}`)
    ).then(msg => {
        message.delete({ timeout: 5000 })
        msg.delete({ timeout: 10000 })
    }).catch(console.error)
    }
}