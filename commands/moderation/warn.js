const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const warnmodel = require('../../database/models/warn-Schema');
module.exports = class WarnCommand extends BaseCommand {
    constructor() {
      super('warn', 'moderation', ['w'], '0');
    }
  
    async run(client, message, args) {
        const logs = client.channels.cache.get('780474092486656000');
        const { author: staff } = message
    const mentionedmember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const reason = args.slice(1).join(' ') 

    if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.channel.send('This command is restricted to Staff!')
    } 
    else if (!mentionedmember) {
        return message.channel.send('You need to mention a member!')
    } 

    
    const mentionedUser = message.guild.members.cache.get(mentionedmember.id)

    if (mentionedUser) {
        const mentionedPosition = mentionedUser.roles.highest.position
        const memberPosition = message.member.roles.highest.position;
        const botPosition = message.guild.me.roles.highest.position;


        if (memberPosition <= mentionedPosition) return message.channel.send('Stop trying to warn your fellow Mods!(or Admins)')
        if (botPosition <= mentionedPosition) return message.channel.send(`My roles are lower than ${mentionedUser}!!`)

       function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 8; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }
      

     try {

       await warnmodel.findOneAndUpdate({
           userID: mentionedmember.id,
       }, {
          userID: mentionedmember.id,
          $push: {
            warningID: makeid(),
            moderator: staff.id,
            date: new Date().getTime(),
            reason: reason,
          }
       }, {
           upsert: true
       }).catch((err) => {
           message.channel.send('There was an error with my database!')
           console.log(err)
       })

       
       message.channel.send(new MessageEmbed()
       .setColor('BLUE')
       .setDescription(`<a:checkmrk:792114500102389780> Warned ${mentionedmember} with the ID \`${makeid()}\``)
       )

       mentionedUser.send(new MessageEmbed()
       .setColor('BLUE')
       .setAuthor('You were Warned!', mentionedUser.user.displayAvatarURL({ dynamic:true }))
       .setDescription(`**You were warned in ${message.guild} by a Staff Member**`)
       .addField('Reason:',`${reason ? `${reason}` : 'No reason was provided!'}`)
       .addField('Staff', `${staff.tag}\`(${staff.id})\``)
       .setTimestamp()).catch((err) => { })

       const log = new MessageEmbed()
       .setTitle('Warn executed!')
       .setAuthor('Wog-Cog', client.user.displayAvatarURL({dynamic:true}))
       .setDescription(`${staff} has warned ${mentionedUser}`)
       .addField('Reason:', `${reason ? `${reason}` : 'No reason was provided!'}`)
       .setTimestamp()
       .setColor('BLUE')

      logs.send(log).catch((err) => { 
         console.log(err);
       });


    } catch (err) {
        message.channel.send('Error! ' + err)  
        throw new Error(err)
    }
    }
    }
}