const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const warns = new SQLite('./db/warns.sqlite');

module.exports = class WarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: "gwarn",
            group: "mod",
            memberName: "gwarn",
            description: "Gives the user a warning and logs it",
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
            examples: ["\\gwarn @Dr. Everett Mann TOO MANY SNEKS"],
            userPermissions: ["KICK_MEMBERS"]
        });
    };

    run (msg, { user, reason }) {
        warns.prepare("INSERT INTO warns (user, guild, mod, reason) VALUES (?, ?, ?, ?);").run(user.id, msg.guild.id, msg.author.id, reason);
        msg.reply(`Warned ${user} for ${reason}`);
    }
};

