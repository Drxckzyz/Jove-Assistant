const { autowarn, makeid, automute } = require('./AutoMod');
module.exports = (client) => {
    client.on('message', async (message) => {
        const { guild , member, content, author } = message

        const bannedlinks = [
            'pornhub.com',
            'https://pornhub.com',
            'http://pornhub.com',
            'xxx.com',
            'https://xxx.com',
            'http://xxx.com',
            'ipgrabber.com',
            'https://ipgrabber.com',
            'http://ipgrabber.com',
            'xxnx.com',
            'https://xxnx.com',
            'http://xxnx.com',
            'redtube.com',
            'http://redtube.com',
            'https://redtube.com',
            'www.fuckmymom.com',
            'fuckmymom.com',
            'http://fuckmymom.com',
            'https://fuckmymom.com',
            'www.brattysis.com',
            'brattysis.com',
            'http://brattysis.com',
            'https://brattysis.com',

        ]
 
        if(bannedlinks.some(word => message.content.toLowerCase().includes(word))) {
            if (message.author.id === message.guild.ownerID) return;
            if(message.member.hasPermission('ADMINISTRATOR')) return;
            await message.delete();
            await message.channel.send(`<:linus:792100393974759447> ${member}, No NSFW/BAD Links!`).then(msg => {
                msg.delete({ timeout: 10000 })
            })
            const user = member.id
        const moderator = client.user.username
        const date = new Date().getTime()
        const reason = '[AutoMod]Posting Nsfw/filtered links!'
            await autowarn(user, makeid(), moderator, date, reason, member, message, client)
        }
    })
    console.log('Anti-Links is ready!')
}