const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const ms = require('ms')
const muteschema = require('../../database/models/mute-schema');

module.exports = class MuteCommand extends BaseCommand {
    constructor() {
      super('mute', 'moderation', ['m', 'shut'], '0');
    }
  
    async run(client, message, args) {
        const logs = client.channels.cache.get('780474092486656000');
        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return //message.reply('This command is restricted to Staff!')
        }
        const msRegex = RegExp(/(\d+(s|m|h|w))/)
        const { guild, author: staff } = message
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if (!target) return message.reply('<:linus:792100393974759447> please mention a user')
         
        const rawduration = args[1]
        if (!rawduration) return message.reply('Please specify a time `2d|2s|2m|2h|2w`')
        if (!msRegex.test(rawduration)) {
            return message.channel.send('That is not a valid amount of time to mute a member!')
        }
        const time = ms(msRegex.exec(rawduration)[1])

        const targetMember = message.guild.members.cache.get(target.id)

        if(targetMember) {
            const mentionedPosition = targetMember.roles.highest.position
            const memberPosition = message.member.roles.highest.position
            const botPosition = message.guild.me.roles.highest.position


            if (memberPosition <= mentionedPosition) return message.channel.send('Stop trying to ban your fellow Mods!(or Admins)')
            if (botPosition <= mentionedPosition) return message.channel.send(`My roles are lower than ${target}!!`)

            try {
                const reason = args.slice(2).join(' ')
                const previosMutes = await muteschema.find({
                    userID: target.id,
                })
        
                const currentlyMuted = previosMutes.filter(mute => {
                    return mute.current === true
                })
        
                if (currentlyMuted.length) {
                    message.reply('That member is already muted!')
                    return
                }
        
                const mutedrole = guild.roles.cache.find(role => {
                    return role.name === 'Muted'
                })
        
                if (!mutedrole) {
                    message.channel.send('How do you want me to mute without a muted role Smfh')
                    throw new Error('No muted Role')
                }
        
                for (const channel of message.guild.channels.cache) {
                    channel[1].updateOverwrite(mutedrole, {
                        SEND_MESSAGES: false,
                        CONNECT: false,
                    }).catch(err => console.log(err))
                }
        
                const expires = Date.now() + time 
        
                const targetmember = (await guild.members.fetch()).get(target.id)
                const noEveryone = targetmember.roles.cache.filter(r => r.name !== '@everyone')
                targetmember.roles.add(mutedrole)
                for (const role of noEveryone) {
                    await targetmember.roles.remove(role[0]).catch(err => console.log(err))
                }
        
                await new muteschema({
                    userID: target.id,
                    guildID: guild.id,
                    reason: reason ? reason : 'No reason was provided!',
                    staffID: staff.id,
                    stafftag: staff.tag,
                    memberRoles: noEveryone.map(r => r),
                    expires,
                    current: true
                }).save()
        
                target.send(new MessageEmbed()
                    .setColor('BLUE')
                    .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
                    .setTitle(`**You were muted in ${message.guild}**`)
                    .setDescription('You were muted by a Staff Member!')
                    .addField('Reason:', `${reason ? `${reason}` : 'No reason was provided!'}`)
                    .addField('Duration:', `${rawduration}`)
                    .addField('Staff:', `${staff} \`${staff.id}\``)
                    .setTimestamp()
                ).catch(() => { });
                message.channel.send(new MessageEmbed()
                    .setColor('BLUE')
                    .setDescription(`<a:checkmrk:792114500102389780> Muted <@${target.id}>! Mutes Go Brrrrr :) `)
                )
                const log = new MessageEmbed()
       .setTitle('Mute executed!')
       .setAuthor('Wog-Cog', client.user.displayAvatarURL({dynamic:true}))
       .setDescription(`${staff} has muted ${target}`)
       .addField('Reason:', `${reason ? `${reason}` : 'No reason was provided!'}`)
       .addField('Duration:', `${rawduration}`)
       .setTimestamp()
       .setColor('BLUE')

      logs.send(log).catch((err) => { 
         console.log(err);
       });
            } catch (err) {
                message.channel.send('Drxckzyz sucks at coding \nError:\n' + err)
                throw new Error(err)
            }
        }
    }
}