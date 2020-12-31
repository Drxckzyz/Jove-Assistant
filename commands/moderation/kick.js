const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const userReg = RegExp(/<@!?(\d+)>/)
module.exports = class NameCommand extends BaseCommand {
    constructor() {
        super('kick', 'moderation', ['yeet', 'k'], '0');
    }

    async run(client, message, args) {
        const logs = client.channels.cache.get('780474092486656000');
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0]
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null)
        const mod = message.author.username

        if (!message.member.hasPermission("KICK_MEMBERS")) return //message.reply("This command is restricted to Staff Members!")
        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send('Can you tell Jove give me `KICK_MEMBERS` perms!!')
        if (!mentionedUser) return message.channel.send('<:linus:792100393974759447>, Ima kick u if u dnt mention a user')

        const mentionedMember = message.guild.members.cache.get(mentionedUser.id)

        if (mentionedMember) {
            const mentionedPosition = mentionedMember.roles.highest.position
            const memberPosition = message.member.roles.highest.position;
            const botPosition = message.guild.me.roles.highest.position;


            if (memberPosition <= mentionedPosition) return message.channel.send('Stop trying to kick your fellow Mods!(or Admins)')
            if (botPosition <= mentionedPosition) return message.channel.send(`My roles are lower than ${mentionedUser}!!`)

            const reason = args.slice(1).join(' ')

            const dm = new MessageEmbed()
                .setTitle('Ello!')
                .setDescription(`You have been kicked from ${message.guild}`)
                .addField('Reason:', `${reason ? `**${reason}**` : '**Not Specified!**'}`)
                .addField('Moderator:', `${mod}`)
                .setTimestamp()
                .setFooter('Unlucky!')
                .setColor('BLUE')

            const ch = new MessageEmbed()
                .setDescription(`<a:checkmrk:792114500102389780> Successfully kicked ${mentionedUser} F in the chat!`)
                .setColor('BLUE')

            try {
                await mentionedMember.send(dm).catch((err) => { });

                await mentionedMember.kick([reason])


                message.channel.send(ch).catch((err) => { });
                const log = new MessageEmbed()
                    .setTitle('Kick executed!')
                    .setDescription(`${mod} has kicked ${mentionedUser}`)
                    .addField('Reason:', `${reason ? `**${reason}**` : '**Not Specified!**'}`)
                    .setTimestamp()
                    .setColor('BLUE')
                await logs.send(log).catch((err) => { });
            }
            catch (error) {
                console.log(error)
                message.channel.send('There was an error Kicking this member.')
            }



        }
    }
}