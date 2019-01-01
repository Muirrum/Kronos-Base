const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class ServerInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            aliases: ['si', 'serveri', 'sinfo'],
            group: "default",
            memberName: "serverinfo",
            description: "Provides information about the current server",
            guildOnly: true,
            examples: ["\\serverinfo"]
        });
    }

    run(msg) {
        var server = msg.guild;
        const embed = new RichEmbed()
            .setTitle(server.name + " Information")
            .setImage(server.iconURL)
            .setDescription("Test")
            .setTimestamp();
        return(msg.embed(embed));
    }
}