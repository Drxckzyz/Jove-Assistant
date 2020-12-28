const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
module.exports = class HelpCommand extends BaseCommand {
    constructor() {
      super('help', 'usercmds', ['helpme'], '15');
    }
  
    async run(client, message, args) {
        const help = new MessageEmbed()
      .setTitle('Help Menu')
      .setDescription('This is a private bot n cannot be invite\n and as well all its commands are moderator only! \nSo here are the bot prefixes!')
      .addField('Bot Prefixes', [
          '<@780786717938024510>: +',
          '<@575252669443211264>: =',
          '<@437808476106784770>: a',
          '<@270904126974590976>: pls',
          '<@302050872383242240>: !d',
          '<@776590574353383454>: d!',
          '<@422087909634736160>: No Clue',
          '<@155149108183695360>: ?',
          '<@234395307759108106>: -',
          '<@159985870458322944>: !',
          '<@235088799074484224>: !',
          '<@458276816071950337>: s/',
          '<@525466971891040257>: PIng!'
      ])

      .setTimestamp()
      .setColor('BLUE')
      .setFooter('To check your warnings run +lw', message.author.displayAvatarURL({ dynamic: true }))

      message.channel.send(help)
    }
}