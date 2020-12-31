const { MessageEmbed } = require('discord.js')
module.exports = client => {
    client.on('message', message => {
        if(!message.author.id === '525466971891040257') {
        if (message.mentions.users.has('579466943170609153')) {
            return message.delete().then(() => {
            const drxc = message.guild.members.cache.get('579466943170609153')
           const msg = message.channel.send(`<:linus:792100393974759447> Drxckzyz doesnt want to be disturbed!, You're message has been sent to his Dms!`)
            drxc.send(new MessageEmbed()
            .setColor('BLUE')
            .setAuthor('You were pinged!', drxc.user.displayAvatarURL({ dynamice:true }))
            .setTitle('Below is the Contents of the Message!')
            .setDescription(`${message.author.tag} Sent:\n \`${message.content}\``)
            .setTimestamp())
            msg.delete({ timeout: 2500 })
        })
        }
    } else {
        return;
    }
    })
}