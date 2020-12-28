const { MessageEmbed } = require('discord.js');
const suggestmodel = require('../../database/models/suggest-schemas');


const statusMessages = {
    WAITING: {
        text: '📊 Waiting for community votes, Please vote!',
        color: 0xffea00,
    },
    ACCEPTED: {
        text: '✔ Accepted idea! Expect this soon',
        color: 0x34eb5b,
    },
    DENIED: {
        text: '❌ Denied!',
        color: 0xc20808,
    },
}


let suggestionCache = {}

const fetchSuggestionchannels = async (guildID) => {
    let query = {}

    if(guildID) {
        query._id = guildID
    }

    const results = await suggestmodel.find(query)
    
    for (const result of results) {
        const { _id, channelId } = result
        suggestionCache[_id] = channelId
    }
}


module.exports = client => {
    fetchSuggestionchannels()

    client.on('message', message => {
        const { guild, channel, content, member } = message
        if(!message.guild) return;
        const cachedChannelId = suggestionCache[guild.id]
        if (cachedChannelId && cachedChannelId === channel.id && !member.user.bot) {
            message.delete()

            const status = statusMessages.WAITING

            const embed = new MessageEmbed()
            .setColor(status.color)
            .setAuthor(member.displayName, member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(content)
            .addFields({
                name: 'Status',
                value: status.text
            })
            .setFooter('Want to suggest something? Simply type it in this channel')

            channel.send(embed)
            .then(message => {
                message.react('👍').then(() => {
                    message.react('👎')
                })
                
            })
        }
    })
    console.log('Suggestions Weady!')
}

module.exports.fetchSuggestionchannels = fetchSuggestionchannels
module.exports.statusMessages = statusMessages
module.exports.suggestionCache = () => {
    return suggestionCache
}