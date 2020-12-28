const BaseCommand = require('../../utils/Handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
module.exports = class PingCommand extends BaseCommand {
    constructor() {
      super('ping', 'info', ['uptime', 'p'], '2');
    }
  
    async run(client, message, args) {
      if(!message.member.hasPermission('ADMINISTRATOR')) {
        return message.channel.send(`<:linus:792100393974759447>`)
      }
        const msg = await message.channel.send(`Pinging...`);
      
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;
    
      const pingembed = new MessageEmbed()
      .setTitle('Pong🏓')
      .setColor('0xE8FF80')
      .setDescription(`**Bot Latency:** *${msg.createdAt - message.createdAt}ms*\n**Api Latency:** *${client.ws.ping}ms*`)
      .setFooter(`Uptime: ${days} D | ${hours} H | ${minutes} M | ${seconds} S`)
      await msg.edit(pingembed);
      await msg.edit("");
    }
}