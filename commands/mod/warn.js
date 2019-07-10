const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class WarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: "warn",
            group: "mod",
            memberName: "warn",
            description: "Gives the user a warning",
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: "Who do you want to warn?",
                    type: 'member'
                },
                {
                    key: 'reason',
                    prompt: "What's the reason?",
                    type: "string"
                }
            ],
            examples: ["\\warn @Dr. Everett Mann TOO MANY SNEKS"],
            userPermissions: ["KICK_MEMBERS"]
        });
    };

    run (msg, { user, reason }) {

    }
};

