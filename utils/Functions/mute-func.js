const mutemodel = require('../../database/models/mute-schema');
const amutemodel = require('../../database/models/automute-schema');
const { MessageEmbed } = require('discord.js');
module.exports = (client) => {
    const checkmutes = async () => {
        console.log('Checking mute data!')
        const now = new Date()

        const conditional = {
            expires: {
                $lt: now
            },
            current: true
        }

        const results = await mutemodel.find(conditional)

        if(results && results.length) {
            for (const result of results) {
                const { guildID, userID } = result

                const guild = client.guilds.cache.get(guildID)
                const member = await guild.members.fetch(userID)

                const mutedRole = guild.roles.cache.find(role => {
                    return role.name === 'Muted'
                })

                member.roles.remove(mutedRole)
                await member.send(new MessageEmbed()
                    .setColor('BLUE')
                    .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL({ dyanmic: true }))
                    .setDescription('**You\'re Mute has expired and you have been unmuted!\n\nBEHAVE YOURSELF!!**\n\n\nPlease Be Patient as I give you back you\'re roles!')
                    .setTimestamp()
                ).catch(() => { });
                const muteDoc = await mutemodel.findOne({userID})
                for (const role of muteDoc.memberRoles) {
                    member.roles.add(role).catch(err => console.log(err))
                }
            }

            await mutemodel.updateMany(conditional, {
                current: false,
            })

            
        }
        setTimeout(checkmutes, 1000 * 60 * 1)
    }
    checkmutes()
    client.on('guildMemberAdd', async (member) => {
        const { guild, id } = member

        const currentMute = await mutemodel.findOne({
            userID: id,
            guildID: guild.id,
            current: true
        })

        if (currentMute) {
            const role = guild.roles.cache.find(role => {
                return role.name === 'Muted'
            })

            if(role) {
                member.roles.add(role)
                member.send(new MessageEmbed()
                .setColor('BLUE')
                .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL({ dyanmic: true }))
                .setTitle('You were Caught <:linus:792100393974759447> <:linus:792100393974759447>')
                .setDescription('You\'re account has been detected for leaving while Muted\nYou have been remuted!\n\nYou can\'t outsmart me!')
                .setTimestamp()
                ).catch(() => { });
            }

            if(!role) {
                throw new Error('NO muted role')
            }
        }
    console.log('Mute-func ready!')
})
}