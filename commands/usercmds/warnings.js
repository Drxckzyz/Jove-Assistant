const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
const warnmodel = require('../../database/models/warn-Schema')
const autowarnmodel = require('../../database/models/autowarn-shema')
module.exports = class WarningsCommand extends BaseCommand {
    constructor() {
      super('warnings', 'usercmds', ['lw'], '25');
    }
  
    async run(client, message, args) {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member

    
    const results = await warnmodel.findOne({
          userID: user.id,
       })

       const resultss = await autowarnmodel.findOne({
           userID: user.id,         
       })

       if(!results) return message.channel.send('Good Job! You are Squeaky Clean!')

     const data = []
     for (let i = 0; 3 > i; i++) {
     data.push(`**ID:** \`${results.warningID[i]}(${i + 1})\``)
     data.push(`**Reason:** ${results.reason[i]}`)
     data.push(`**Mod:** ${await message.client.users.fetch(results.moderator[i]).catch(() => 'Deleted User')}`)
     data.push(`**Date:** ${new Date(results.date[i]).toLocaleDateString()}\n`)
    }

    const adata = []
    for(let i = 0; 3 > i; i++) {
        adata.push(`**ID:** \`${resultss.warningID[i]}(${i + 1})\``)
        adata.push(`**Reason:** ${resultss.reason[i]}`)
        adata.push(`**Date:** ${new Date(resultss.date[i]).toLocaleDateString()}\n`)
    }

    const data22 = []
     for (let i = 0; results.warningID.length > i; i++) {
     data22.push(`**ID:** \`${results.warningID[i]}(${i + 1})\``)
     data22.push(`**Reason:** ${results.reason[i]}`)
     data22.push(`**Mod:** ${await message.client.users.fetch(results.moderator[i]).catch(() => 'Deleted User')}`)
     data22.push(`**Date:** ${new Date(results.date[i]).toLocaleDateString()}\n`)
    }

    const adata2 = []
    for(let i = 0; resultss.warningID.length > i; i++) {
        adata2.push(`**ID:** \`${resultss.warningID[i]}(${i + 1})\``)
        adata2.push(`**Reason:** ${resultss.reason[i]}`)
        adata2.push(`**Date:** ${new Date(resultss.date[i]).toLocaleDateString()}\n`)
    }
     message.channel.send(new MessageEmbed()
     .setColor('BLUE')
     .setAuthor(`${user.username}'s Warnings`, user.displayAvatarURL({ dynamic: true}))
     .setDescription(`Moderator Warnings: ${results.warningID.length}\nAutoMod Warnings: ${resultss.warningID.length}\n You're Top 3 warnings are listed the rest were sent to your Dms!`)
     .addFields(
         { name: 'Moderator:', value: data.join('\n'), inline: true},
         { name: 'AutoMod:', value: adata.join('\n'), inline: true }
     )
     )

     message.member.send(new MessageEmbed()
     .setColor('BLUE')
     .setAuthor(`${user.username}'s Warnings`, user.displayAvatarURL({ dynamic: true}))
     .setDescription(`Moderator Warnings: ${results.warningID.length}\nAutoMod Warnings: ${resultss.warningID.length}`)
     .addFields(
         { name: 'Moderator:', value: data22.join('\n'), inline: true},
         { name: 'AutoMod:', value: adata2.join('\n'), inline: true }
     )).catch((err) => message.channel.send('Failed to send warnings list to dms!\nAsk a staff member to review it for you!'))
    }
}