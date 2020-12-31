const { MessageEmbed } = require('discord.js')
module.exports = client => {
    const logs = client.channels.cache.get(process.env.LOGS)

    client.on('channelCreate', async function(channel) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Channel Created')
        .setDescription(`This channel > ${channel} was created!`)
        .setTimestamp())
    })

    client.on("channelDelete", async function (channel) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Channel Deleted!')
        .setDescription(`This channel > **${channel.name}** ID: \`${channel.id}\` was deleted!`)
        .setTimestamp())
    });

    client.on("channelPinsUpdate", async function (channel, time) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Channel Pins updated!')
        .setDescription(`This channel > ${channel} pins was updated at: \n${time}`)
        .setTimestamp())
    });

    client.on("channelUpdate", async function (oldChannel, newChannel) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Channel Updated!')
        .setDescription(`A channel was updated! Either the name changed or the topic changed! \nBefore: ${oldChannel}\nAfter: ${newChannel}`)
        .setTimestamp())
    });

    client.on("clientUserGuildSettingsUpdate", async function (clientUserGuildSettings) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('User Guild Setting Updated!')
        .setDescription(`A user updated there guild Settings\n${clientUserGuildSettings}`)
        .setTimestamp())
    });

    client.on("clientUserSettingsUpdate", async function (clientUserSettings) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('User Settings was updating')
        .setDescription(`User settings was updated!\n${clientUserSettings}`)
        .setTimestamp())
    });

    client.on("disconnect", async function (event) {
        await logs.send(new MessageEmbed()
        .setTitle('Bot disconnected')
        .setColor('BLUE')
        .setDescription(`Tha event:\n${event}`)
        .setTimestamp())
        console.log(`Disconnected: ` + event)
    });

    client.on("emojiCreate", async function (emoji) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Emoji Created')
        .setDescription(`Emoji:\n${emoji}`)
        .setTimestamp())
    });

    client.on("emojiDelete", async function (emoji) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Emoji Deleted!')
        .setDescription(`Emoji:\n${emoji}`)
        .setTimestamp())
    });
    
    client.on("emojiUpdate", async function (oldEmoji, newEmoji) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Emoji Updated!')
        .setDescription(`Emoji:\nBefore${oldEmoji}\nAfter:${newEmoji}`)
        .setTimestamp())
    });
    
    client.on("error", async function (error) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Bot Error!')
        .setDescription(`The bot encoutered an error:\n${error}`)
        .setTimestamp())
    });

    client.on("guildBanAdd", async function (guild, user) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Member Banned!')
        .setDescription(`This user:\n${user} was banned from this guild\n${guild}`)
        .setTimestamp())
    });
    
    client.on("guildBanRemove", async function (guild, user) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Member Unbanned!')
        .setDescription(`This user:\n${user} was unbanned from this guild\n${guild}`)
        .setTimestamp())
    });
    
    client.on("guildCreate", async function (guild) {
        console.log(`The client joined a guild ${guild}`);
    });
    
    client.on("guildDelete", async function (guild) {
        console.log(`The client deleted/left a guild ${guild}`);
    });
    
    client.on("guildMemberAdd", async function (member) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Member Join!')
        .setDescription(`This user:\n${member} joined this guild\n${member.guild}`)
        .addField('Account created at:', `${member.createdAt}`)
        .setTimestamp())
    });
    
    client.on("guildMemberAvailable", async function (member) {
        await logs.send(`Member Available: ` + member.tag)
        console.log(`member becomes available in a large guild: ${member.tag}`);
    });

    client.on("guildMemberRemove", async function (member) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Member left or kicked!')
        .setDescription(`This user:\n${member} left or was kicked from this guild!`)
        .addField('Account created at:', `${member.createdAt}`)
        .setTimestamp())
    });

    client.on("guildMembersChunk", function (members, guild) {
        console.error(`a chunk of guild members is received\n${members}\n${guild}`);
    });

    client.on("guildMemberUpdate", async function (oldMember, newMember) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Member Updated!')
        .setDescription(`A user was updated!\nBefore: ${oldMember}\nAfter:${newMember}`)
        .setTimestamp())
    });

    client.on("guildUnavailable", function (guild) {
        console.error(
            `Guild unavailable, likely due to a server outage: ${guild}`
        );
    });

    client.on("guildUpdate", async function (oldGuild, newGuild) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Guild Updated!')
        .setDescription(`Guild was updated!\nBefore: ${oldGuild}\nAfter:${newGuild}`)
        .setTimestamp())
    });

    client.on("messageDelete", async function (message) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Message Deleted!')
        .setDescription(`Message deleted!\nMessage:\n${message}`)
        .setTimestamp())
        
    });
    
    client.on("messageDeleteBulk", async function (messages) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Bulk Message!')
        .setDescription(`A bunch of messages was deleted!\nContent:\n${messages}`)
        .setTimestamp())
    });

    client.on("messageUpdate", async function (oldMessage, newMessage) {
        if(oldMessage.author.bot) return;
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Message Updated!')
        .setDescription(`Message Updated!\nBefore: ${oldMessage}\nAfter: ${newMessage}\nUser: ${oldMessage.author}`)
        .setTimestamp())
    });

    client.on("reconnecting", function () {
        console.log(`Client is trying to reconnect to the WebSocket`);
    });

    client.on("resume", async function (replayed) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Bot reconnected!')
        .setDescription(`${replayed}`)
        .setTimestamp())
        console.log(`WebSocket resumed, ${replayed} replays`);
    });

    client.on("roleCreate", async function (role) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Role Created!')
        .setDescription(`Role:\n${role}`)
        .setTimestamp())
    });
    
    client.on("roleDelete", async function (role) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Role Deleted!')
        .setDescription(`Role deleted:\n${role.name}`)
        .setTimestamp())
    });
   
    client.on("roleUpdate", async function (oldRole, newRole) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Role Updated!')
        .setDescription(`Role updated:\nBefore: ${oldRole}\nAfter: ${newRole}`)
        .setTimestamp())
    });

    client.on("warn", async function (info) {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Bot warning!')
        .setDescription(`${info}`)
        .setTimestamp())
        console.log(`warn: ${info}`);
    });

    client.on('ready', async client => {
        await logs.send(new MessageEmbed()
        .setColor('BLUE')
        .setTitle('Bot online!')
        .setDescription(`Bot is now online\nPing: ${client.ws.ping}`)
        .setTimestamp())
    })

    console.log('Logging is ready!')
}