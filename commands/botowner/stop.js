const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
module.exports = class StopCommand extends BaseCommand {
    constructor() {
      super('stop', 'botowner', ['die', 'yeetoffline'], '20');
    }
  
    async run(client, message, args) {
        if(!message.author.id === '525466971891040257' || !message.author.id === '579466943170609153') return message.reply('Ima yeet outta the server if u keep playin')
        

        message.channel.send('No').then(() => {
            process.exit();
        })
    }
}