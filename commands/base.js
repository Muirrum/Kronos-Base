const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class YourCommand extends Command {
    constructor(client) {
        super(client, {
            name: "your",
            group: "mod",
            memberName: "your",
            description: "Gives the user a warning",
            guildOnly: true,
            args: [
                {
                    key: 'arg',
                    prompt: "arg",
                    type: 'string'
                }
            ],
            examples: ["\\your "],
            userPermissions: ["KICK_MEMBERS"]
        });
    };

    run (msg) {

    }
};

