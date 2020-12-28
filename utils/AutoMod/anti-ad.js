const { MessageEmbed } = require('discord.js');
const { autowarn, makeid, automute } = require('./AutoMod');
module.exports = (client) => {
    const isInvites = async (guild, code) => {
        return await new Promise(resolve => {
        guild.fetchInvites().then((invites) => {
              for (const invite of invites) {
                  if (code === invite[0]) {
                      resolve(true)
                      return
                  }
              }

              resolve(false)
           })
       })
    }
    client.on('message', async (message) => {
        const { guild , member, content, author } = message
        const code = content.split('discord.gg/')[1]
       /* if (message.member.hasPermission('MANAGE_CHANNELS')) {
            return 
        } else if (!message.member.hasPermission('MANAGE_CHANNELS')) {*/
        if (content.includes('discord.gg/')) {
        const userID = member.id
        const moderator = author.id
        const reason = '[AutoMod] Sending Discord Invites'
        const date = new Date().getTime()
        const warningID = makeid()
           const isOurInvite = await isInvites(guild, code)
           if (!isOurInvite) {
            await message.delete()
            await message.channel.send(`<:linus:792100393974759447> ${member}, No Advertising Discord Server!`).then(msg => {
                 msg.delete({ timeout: 10000 })
            }).catch(console.error);
              await autowarn(userID, warningID, moderator, date, reason, member, message, client).catch((err) => {console.log(err)})
           }
        } else if (content.includes('discrod.gg/')) {
            const isOurInvite = await isInvites(guild, code)
           if (!isOurInvite) {
            await message.delete()
            await message.channel.send(`<:linus:792100393974759447> ${member}, No Advertising Discord Server!`).then(msg => {
                msg.delete({ timeout: 10000 })
            }).catch(console.error);
            await autowarn(userID, warningID, moderator, date, reason, member, message, client).catch((err) => {console.log(err)})
           }
        }

   /* }*/
    })
    console.log('Anti-Ad is ready!')
}