const BaseCommand = require('../../utils/handlers/BaseCommand');
const { MessageEmbed } = require('discord.js')
module.exports = class NameCommand extends BaseCommand {
    constructor() {
      super('name', 'folder', [], 'cooldowns');
    }
  
    async run(client, message, args) {


    }
}