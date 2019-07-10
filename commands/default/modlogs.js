const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const SQLite = require("better-sqlite3");
const bans = new SQLite("./db/bans.sqlite");
const kicks = new SQLite("./db/kicks.sqlite");
const warns = new SQLite("./db/warns.sqlite");

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
                    prompt: "User you want to check?",
                    type: 'member'
                }
            ],
            examples: ["\\modlogs @Dr. Everett Mann"]
        });
    };

    run (msg, { userid }) {
        // Look at bans
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

        // Look up kicks
        msg.reply(`Looking up kicks for ${userid}`);
        let kickList = kicks.prepare(`SELECT * FROM kicks WHERE user = ?`).all(userid.id);
        if (Array.isArray(kickList)) {
            for (var i = 0; i < kickList.length; i++) {
                msg.reply(`Kicked by ${kickList[i].mod} in server ${kickList[i].guild} because of ${kickList[i].reason}`);
            }
        } else if (!Array.isArray(kickList) && kickList) {
            msg.reply(`Kicked by ${kickList[i].mod} in server ${kickList[i].guild} because of ${kickList[i].reason}`);
        } else if (kickList == undefined) {
            msg.reply(`No kicks found for ${userid.username}`);
        } else {
            msg.reply(`Could not find any kicks`);
        }
        msg.reply(`Finished looking up kicks for the user`);

        // Look up warns
        msg.reply(`Looking up warns for ${userid}`);
        let warnList = warns.prepare(`SELECT * FROM warns WHERE user = ?`).all(userid.id);
        if (Array.isArray(warnList)) {
            for (var i = 0; i < warnList.length; i++) {
                msg.reply(`Warned by ${warnList[i].mod} in server ${warnList[i].guild} because ${warnList[i].reason}`);
            }
        } else if (!Array.isArray(warnList) && warnList) {
            msg.reply(`Warned by ${warnList.mod} in server ${warnList.guild} because ${warnList.reason}`);
        } 
        else if (warnList == undefined) {
            msg.reply(`No warns found for ${userid}`);
        }
        else {
            msg.reply("Could not find warns");
        }
        msg.reply(`Finished looking up warns for the user`);
    }
};

