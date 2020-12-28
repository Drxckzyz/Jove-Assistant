const BaseEvent = require('../utils/Handlers/BaseEvent');
const { Collection, MessageEmbed } = require('discord.js')
module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('message');
    }

    async run(client, message) {
        if (message.mentions.users.has(client.user.id)) {
            return message.channel.send(`<:linus:792100393974759447> Why Ping, anyways my prefix is \`${client.prefix}\` !`)
        }
        if (message.author.bot || !message.content.toLowerCase().startsWith(client.prefix) || !message.guild) return;
        const [cmdName, ...cmdArgs] = message.content
            .slice(client.prefix.length)
            .trim()
            .split(/\s+/);
        const command = client.commands.get(cmdName);
        if(!command) return;
        if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new Collection())
        }

        const now = Date.now()
        const timestamps = client.cooldowns.get(command.name)
        const cooldownAmount = (command.cooldown || 0) * 1000

        if(message.author.id === '579466943170609153') {
            timestamps.delete(message.author.id)
        }

        if (timestamps.has(message.author.id)) {
            const expirationdate = timestamps.get(message.author.id) + cooldownAmount

            if (now < expirationdate) {
                const timeleft = (expirationdate - now) / 1000
                const ne = new MessageEmbed()
                    .setTitle('Cooldown! Slow Down!')
                    .setDescription(`**Please wait ${timeleft.toFixed(1)} Seconds before running the ${command.name} command again!**`)
                    .setColor('0xDB2C2C')
                return message.channel.send(ne)
            }
        }

        timestamps.set(message.author.id, now)
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)


        if (command) {
            command.run(client, message, cmdArgs);
            console.log(command)
        } else {
            return;
        }
    }
}