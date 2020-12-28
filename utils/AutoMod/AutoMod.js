const warnmodel = require('../../database/models/autowarn-shema');
const { MessageEmbed } = require('discord.js');
const mutemodel = require('../../database/models/automute-schema');

async function autowarn(userID, warningID, moderator, date, reason, member, message, client) {
    let warnDoc = await warnmodel.findOne({
        userID,
    })
   if(!warnDoc){
       warnDoc = new warnmodel({
           userID,
           warningID,
           moderator,
           date,
           reason,
       })
       await warnDoc.save().catch(err => console.log(err))
   } else {
       if(warnDoc.warningID.length === 5) {
        const MMreason = 'Violations'
        await warnmodel.findOneAndUpdate({
            userID,
        }, {
            userID,
            $push: {
                warningID,
                moderator,
                date,
                reason,
            }
        }).catch((err) => {
            message.channel.send('There was an error with my database!')
            console.log(err)
        })
   
        member.send(new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`**You were warned in ${message.guild}**`)
            .setDescription('You were warned by the moderation system!')
            .addField('Reason:', `${reason}`)
            .addField('ID:', `${warningID}`)
            .setTimestamp()
        ).catch(() => { });
        await automute(MMreason, message, member, client)
        return
   } else {
    if(warnDoc.warningID.length === 10) {
        const MMreason = 'Violations'
        await warnmodel.findOneAndUpdate({
            userID,
        }, {
            userID,
            $push: {
                warningID,
                moderator,
                date,
                reason,
            }
        }).catch((err) => {
            message.channel.send('There was an error with my database!')
            console.log(err)
        })
   
        member.send(new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`**You were warned in ${message.guild}**`)
            .setDescription('You were warned by the moderation system!')
            .addField('Reason:', `${reason}`)
            .addField('ID:', `${warningID}`)
            .setTimestamp()
        ).catch(() => { });
        await automute(MMreason, message, member, client)
        return
   } else {
    if(warnDoc.warningID.length === 15) {
        const MMreason = 'Violations'
        await warnmodel.findOneAndUpdate({
            userID,
        }, {
            userID,
            $push: {
                warningID,
                moderator,
                date,
                reason,
            }
        }).catch((err) => {
            message.channel.send('There was an error with my database!')
            console.log(err)
        })
   
        member.send(new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`**You were warned in ${message.guild}**`)
            .setDescription('You were warned by the moderation system!')
            .addField('Reason:', `${reason}`)
            .addField('ID:', `${warningID}`)
            .setTimestamp()
        ).catch(() => { });
        await automute(MMreason, message, member, client)
        return
   } else {
    if(warnDoc.warningID.length === 15) {
        const MMreason = 'Violations'
        await warnmodel.findOneAndUpdate({
            userID,
        }, {
            userID,
            $push: {
                warningID,
                moderator,
                date,
                reason,
            }
        }).catch((err) => {
            message.channel.send('There was an error with my database!')
            console.log(err)
        })
   
        member.send(new MessageEmbed()
            .setColor('BLUE')
            .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`**You were warned in ${message.guild}**`)
            .setDescription('You were warned by the moderation system!')
            .addField('Reason:', `${reason}`)
            .addField('ID:', `${warningID}`)
            .setTimestamp()
        ).catch(() => { });
        await automute(MMreason, message, member, client)
        return
    }
   }
   } 
   } 
       }
    
       await warnmodel.findOneAndUpdate({
        userID,
    }, {
        userID,
        $push: {
            warningID,
            moderator,
            date,
            reason,
        }
    }).catch((err) => {
        message.channel.send('There was an error with my database!')
        console.log(err)
    })

    member.send(new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`**You were warned in ${message.guild}**`)
        .setDescription('You were warned by the moderation system!')
        .addField('Reason:', `${reason}`)
        .addField('ID:', `${warningID}`)
        .setTimestamp()
    ).catch(() => { });
    return
}


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 8; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

async function automute(Mreason, message, target, client) {
    const { guild } = message
    const reasons = {
        Spamming: 4,
        Links: 2,
        MultipleAds: 2,
        NoBlackrole: 24,
        Violations: 6,
    }

    if (!reasons[Mreason]) {
        throw new Error('Invalid AutoMod Reason')
    }

    const previosMutes = await mutemodel.find({
        userID: target.id,
    })

    const currentlyMuted = previosMutes.filter(mute => {
        return mute.current === true
    })

    if(currentlyMuted.length) {
        return console.log('Already Muuted!')
    }

    let duration = reasons[Mreason] * (previosMutes + 1)

    const expires = new Date()
    expires.setHours(expires.getHours() + duration)

    const mutedrole = guild.roles.cache.find(role => {
        return role.name === 'Muted'
    })
    if (!mutedrole) {
        throw new Error('No muted Role!')
    }

    for (const channel of message.guild.channels.cache) {
        channel[1].updateOverwrite(mutedrole, {
            SEND_MESSAGES: false,
            CONNECT: false,
        }).catch(err => console.log(err))
    }

    const targetmember = (await guild.members.fetch()).get(target.id)
    const noEveryone = targetmember.roles.cache.filter(r => r.name !== '@everyone')
    targetmember.roles.add(mutedrole)
    for (const role of noEveryone) {
        await targetmember.roles.remove(role[0]).catch(err => console.log(err))
    }

    await new mutemodel({
        userID: target.id,
        guildID: guild.id,
        reason: Mreason,
        staffID: client.user.id,
        stafftag: client.user.tag,
        memberRoles: noEveryone.map(r => r),
        expires,
        current: true
    }).save().catch((err) => {
        message.channel.send('There was an error with my database!')
        console.log(err)
    })

    message.channel.send(new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`<a:checkmrk:792114500102389780> Muted ${target} for multiple infractions!`)
    )
    target.send(new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        .setTitle(`**You were Muted in ${message.guild}**`)
        .setDescription('You were Muted by the moderation system!')
        .addField('Reason:', `[AutoMod] ${Mreason}`)
        .addField('Expirers At:', `${expires.toLocaleTimeString()} | ${expires.toLocaleDateString()}`)
        .setTimestamp()
    ).catch(() => { });
}

module.exports = {
    autowarn,
    makeid,
    automute,
}
/*if (numbers.warningID.length >= 10) {
    console.log('Test')
     const MMreason = 'Violations'
     await automute(MMreason, message, member, client)
     await warnmodel.findOneAndUpdate({
         userID,
     }, {
         userID,
         $push: {
             warningId,
             moderator,
             date,
             reason,
         }
     }, {
         upsert: true
     }).catch((err) => {
         message.channel.send('There was an error with my database!')
         console.log(err)
     })

     member.send(new MessageEmbed()
         .setColor('BLUE')
         .setAuthor(`${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
         .setTitle(`**You were warned in ${message.guild}**`)
         .setDescription('You were warned by the moderation system!')
         .addField('Reason:', `${reason}`)
         .addField('ID:', `${warningId}`)
         .setTimestamp()
     ).catch(() => { });
     return
} */