const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
module.exports = class WelcomeCommand extends BaseCommand {
    constructor() {
      super('welcome', 'modcmds', ['well', 'wel'], '0');
    }
  
    async run(client, message, args) {
        if(!message.member.hasPermission('MANAGE_CHANNELS')) return;
    
    
     await message.channel.send(`Welcome! to  **${message.guild}**\nBe sure to read tha rules!`);
    }
}