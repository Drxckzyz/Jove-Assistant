const mutemodel = require('./database/models/automute-schema');
const { MessageEmbed } = require('discord.js');
module.exports = (client) => {
    const checkMutes = async () => {
        console.log('Checking Automutes data')

        const now = new Date()

        const conditional = {
            expires: {
                $lt: now
            },
            current: true
        }

        const results = await mutemodel.find(conditional).catch(err => console.log('Error' + err))

        if (results && results.length) {
            for (const result of results) {
                const { guildID, userID } = result
               
                const guild = client.guilds.cache.get(guildID)
                const member = await guild.members.fetch(userID)
                
                const mutedrole = await guild.roles.cache.find(role => {
                    return role.name === 'Muted'
                })
    

                member.roles.remove(mutedrole).catch(err => console.log('Error' + err))
                await member.send(new MessageEmbed()
                .setColor('BLUE')
                .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL({ dyanmic: true }))
                .setDescription('**You\'re Mute has expired and you have been unmuted!\n\nBEHAVE YOURSELF!!**')
                .setTimestamp()
                ).catch(() => { });
                const muteDoc = await mutemodel.findOne({userID})
                for (const role of muteDoc.memberRoles) {
                    member.roles.add(role).catch(err => console.log(err))
                }

            }

            

            await mutemodel.updateMany(conditional, {
                current: false
            })
        }
        setTimeout(checkMutes, 1000 * 60 * 1)
    }
    checkMutes()
    client.on('guildMemberAdd', async (member) => {
        const { guild, id } = member

        const currentMutes = await mutemodel.findOne({
            userID: id,
            guildID: guild.id,
            current: true,
        })

        if (currentMutes) {
            const role = guild.roles.cache.find(role => {
                return role.name === 'Muted'
            })

            if (role) {
                member.roles.add(role)
                member.send(new MessageEmbed()
                .setColor('BLUE')
                .setAuthor(`${client.user.tag}`, client.user.displayAvatarURL({ dyanmic: true }))
                .setTitle('You were Caught <:lol:750352172650332230> <:lol:750352172650332230>')
                .setDescription('You\'re account has been detected for leaving while Muted\nYou have been remuted!\n\nYou can\'t outsmart me!')
                .setTimestamp()
                ).catch(() => { });
            }

            if (!role) {
                throw new Error('No muted role found!')
            }
        }
    })
    console.log('Auto-Mute-func ready!')
}