const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const bans = new SQLite("./db/bans.sqlite");

module.exports = class LogsCommand extends Command {
    constructor(client) {
        super(client, {
            name: "modlogs",
            group: "default",
            memberName: "modlogs",
            description: "Checks the modlogs of a given user.",
            guildOnly: true,
            args: [
                {
                    key: 'userid',
                    prompt: "ID you want to check?",
                    type: 'string'
                }
            ],
            examples: ["\\modlogs @Dr. Everett Mann"]
        });
    };

    run (msg, { userid }) {
        msg.say(userid);
        let banList = bans.prepare(`SELECT * FROM bans WHERE user = ?`).get(userid);
        if (banList) {
            msg.reply(banList);
        } else {
            msg.reply(`No bans found for ${userid}`);
        }
    }
};

