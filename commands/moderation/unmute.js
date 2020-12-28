const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const mutemodel = require('../../database/models/mute-schema');
module.exports = class UnmuteCommand extends BaseCommand {
    constructor() {
      super('unmute', 'moderation', ['um', 'unshut'], '0');
    }
  
    async run(client, message, args) {
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return //message.reply('This command is restricted to Staff!')
        }
    
        const { guild, author: staff } = message
            const target = message.mentions.users.first() 
            let id = ''
            if(target) {
                id = target.id
            } else {
                id = args[0]
            }
            const mentionedPosition = target.roles.highest.position
           const memberPosition = message.member.roles.highest.position
    
           if (memberPosition <= mentionedPosition) {
               return message.reply('<:linus:792100393974759447> <:linus:792100393974759447><:linus:792100393974759447><:linus:792100393974759447><:linus:792100393974759447><:linus:792100393974759447><:linus:792100393974759447>')
           }
    
    
            const result = await mutemodel.updateOne({
                userID: id,
                guildID: guild.id,
                current: true,
            }, {
                current: false
            }
            )
    
    
            if (result.nModified === 1){
                const mutedrole = guild.roles.cache.find(role => {
                    return role.name === 'Muted'
                })
                if(mutedrole) {
                    const guildmember = guild.members.cache.get(id)
                    if(!guildmember) return
                    guildmember.roles.remove(mutedrole)
                    const muteDoc = await mutemodel.findOne({userID: id})
                    for (const role of muteDoc.memberRoles) {
                        guildmember.roles.add(role).catch(err => console.log(err))
                    }
                    message.channel.send(new MessageEmbed()
                    .setColor('BLUE')
                    .setDescription(`<a:checkmrk:780789081302106154> Unmuted <@${id}> Unmutes go Brrr!`))
                    guildmember.send(new MessageEmbed()
                    .setColor('BLUE')
                    .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL({ dynamic: true }))
                    .setTitle('You were Unmuted By a Staff Member')
                    .setDescription(`${message.author} Has Unmuted you!\n\n **BEHAVE YOURSELF**`)
                    .setTimestamp())
                } else {
                    throw new Error('NO muted Role!')
                }
            } else {
                message.reply(`<:linus:792100393974759447> That user is not Muted!`).then(msg => {
                    message.delete({ timeout: 5000 })
                    msg.delete({ timeout: 5000 })
                })
            }
    }
}