const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
module.exports = class SlowmodeCommand extends BaseCommand {
    constructor() {
      super('slowmode', 'moderation', ['sm'], '0');
    }
  
    async run(client, message, args) {
        if (!message.member.hasPermission('MANAGE_CHANNEL')) {
            return message.channel.send('This command is restricted to Staff!')
        }
        const { channel } = message
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("You cannot use this command.");
        if (!args[0]) return message.channel.send('You did not mention a number in seconds to set the slowmode to!');
        if (args[0] === 'none') {
            await message.channel.setRateLimitPerUser(0);
            return message.channel.send('Slowmode: off!');
        } else if(args[0] === 'off'){
            await message.channel.setRateLimitPerUser(0);
            return message.channel.send('Slowmode: off!');
        }
        if (isNaN(args[0])) return message.channel.send('<:linus:792100393974759447> not a number doe');
        const setTimeto = Number(args[0]);

       

        channel.setRateLimitPerUser(setTimeto)
        message.channel.send(`Slowmode has been set to ${setTimeto}`)
    }
}