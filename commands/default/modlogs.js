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
                    type: 'member'
                }
            ],
            examples: ["\\modlogs @Dr. Everett Mann"]
        });
    };

    run (msg, { userid }) {
        msg.reply(`Looking up bans for ${userid}`);
        let banList = bans.prepare(`SELECT * FROM bans WHERE user = ?`).all(userid.id);
        if (Array.isArray(banList)) {
            for (var i = 0; i < banList.length; i++) {
                msg.reply(`Banned by ${banList[i].mod} in server ${banList[i].guild} because ${banList[i].reason}`);
            }
        } else if (!Array.isArray(banList) && banList) {
            msg.reply(`Banned by ${banList.mod} in server ${banList.guild} because ${banList.reason}`);
        } 
        else if (banList == undefined) {
            msg.reply(`No bans found for ${userid}`);
        }
        else {
            msg.reply("Could not find bans");
        }
        msg.reply(`Finished looking up bans for the user`);
    }
};

