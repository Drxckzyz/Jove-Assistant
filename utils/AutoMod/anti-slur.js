const { autowarn, makeid } = require('./AutoMod');
module.exports = client => {
    client.on('message', async message => {
        const { member } = message
        if(message.author.bot) return;
        const slur = ['nigga', 'n1gga', 'nibba', 'n1bba', 'nigger', 'nigeria', 'nigerian', 'nickgurr', 'nick gurr', 'nickgur', 'nigha', 'nickur', 'nicka', 'nibber', 'n!ckgurr', 'n!gga', 'n!gger']
        if(slur.some(w => ` ${message.content.toLowerCase()} `.includes(` ${w}`))) {

        if(!message.member.roles.cache.has('781205732744888330')) {
            return 
        } else {
            message.delete()
            message.channel.send(`<:linus:792100393974759447> ${message.author}, You Have 1 Day to prove that your black in <#781202317378060298> or get Banned!`)
            message.author.send('You\'re 1 Day begins now, and The Server Staff team has been notified!')
            const staffc = client.channels.cache.get('750416198868402287')
            staffc.send(`Hey <@&781198581960540220>, ${message.author} Juss said a racial slur without the black role\n They have been notified that they have 1 day!`)
        }
    }

    })
}