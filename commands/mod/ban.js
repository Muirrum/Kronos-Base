const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const bans = new SQLite("./db/bans.sqlite");

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ban",
            group: "mod",
            memberName: "ban",
            description: "Bans the specified user and logs it",
            guildOnly: true,
            args: [
                {
                    key: 'user',
                    prompt: "Who do you want to ban?",
                    type: 'member'
                },
                {
                    key: "reason",
                    prompt: "For what reason?",
                    type: "string"
                }
            ],
            examples: ["\\ban @Muirrum TOO MANY SNEKS"],
            userPermissions: ["BAN_MEMBERS"]
        });
    };

    run (msg, { user, reason }) {
        msg.guild.ban(user, {reason: reason});
        bans.prepare(`INSERT INTO bans (user, guild, mod, reason) VALUES (${user.id}, ${msg.guild.id},${msg.author.id}, ${reason});`).run();
        
    }
};

