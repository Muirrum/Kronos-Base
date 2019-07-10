const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const kicks = new SQLite('./db/kicks.sqlite');

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

    run (msg, { user, reason }) {
        kicks.prepare('INSERT INTO kicks (user, guild, mod, reason) VALUES (?, ?, ?, ?);').run(user.id, msg.guild.id, msg.author.id, reason);
        msg.guild.kick(user, {reason: reason});
        msg.reply(`Kicked user ${user.username}`);
    }
};

