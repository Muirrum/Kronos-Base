const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: "kick",
            group: "mod",
            memberName: "kick",
            description: "Kicks the user from the server",
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: "What user would you like to kick?",
                    type: 'member'
                }, 
                {
                    key: "reason",
                    prompt: "What's the reason?",
                    type: "string"
                }
            ],
            examples: ["\\kick @Muirrum Time's running out for you "],
            userPermissions: ["KICK_MEMBERS"]
        });
    };

    run (msg) {

    }
};

