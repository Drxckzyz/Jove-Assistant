const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const userReg = RegExp(/<@!?(\d+)>/)
module.exports = class BanCommand extends BaseCommand {
    constructor() {
      super('ban', 'moderation', ['b'], '0');
    }
  
    async run(client, message, args) {
        const logs = client.channels.cache.get('780474092486656000');
        const userID = userReg.test(args[0]) ? userReg.exec(args[0])[1] : args[0]
        const mentionedUser = await message.client.users.fetch(userID).catch(() => null)
        const mod = message.author.username

        if (!message.member.hasPermission("BAN_MEMBERS")) return //message.reply("This command is restricted to Staff Members!")
        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('Can you tell Jove give me `BAN_MEMBERS` perms!!')
        if (!mentionedUser) return message.channel.send('<:linus:792100393974759447>, Ima ban u if u dnt mention a user')

        const allBans = await message.guild.fetchBans()

        if (allBans.get(mentionedUser.id)) return message.channel.send('This user is already banned!(*Double banning isn\'t a thing chief*)')

        const mentionedMember = message.guild.members.cache.get(mentionedUser.id)

        if (mentionedMember) {
            const mentionedPosition = mentionedMember.roles.highest.position
            const memberPosition = message.member.roles.highest.position
            const botPosition = message.guild.me.roles.highest.position


            if (memberPosition <= mentionedPosition) return message.channel.send('Stop trying to ban your fellow Mods!(or Admins)')
            if (botPosition <= mentionedPosition) return message.channel.send(`My roles are lower than ${mentionedUser}!!`)

            const reason = args.slice(1).join(' ')

            const dm = new MessageEmbed()
                .setTitle('Ello!')
                .setDescription(`You have been banned from ${message.guild}`)
                .addField('Reason:', `${reason ? `**${reason}**` : '**Not Specified!**'}`)
                .addField('Moderator:', `${mod}`)
                .addField('Ban Appeals:', 'https://forms.gle/Mw6EA58bk4oWDPSQ8')
                .setTimestamp()
                .setColor('BLUE')

            await mentionedUser.send(dm).catch((err) => { });

            await message.guild.members.ban(mentionedUser.id, { reason: reason }).catch((err) => {
                message.channel.send('Failed to ban member! ' + err)
                console.log(err)
            });

            const ch = new MessageEmbed()
                .setDescription(`${mentionedUser} has been strucked by the BanHammer!`)
                .setColor('BLUE')
            await message.channel.send(ch).catch((err) => { });

            const log = new MessageEmbed()
                .setTitle('Ban executed!')
                .setDescription(`${mod} has banned ${mentionedUser}`)
                .addField('Reason:', `${reason ? `for **${reason}**` : 'Not Specified!'}`)
                .setTimestamp()
                .setColor('BLUE')

            logs.send(log).catch((err) => {
                console.log(err);
            });
        }
    }
}