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
        let banList = bans.prepare(`SELECT * FROM bans WHERE user = ?`).all(userid.id);

        var banMsg = `**Looking up bans for ${userid.user.username}#${userid.user.discriminator}**\n`;
        if (banList) {

            for (var i = 0; i < banList.length; i++) {
                var banBase = `Banned by ${banList[i].mod} in server ${banList[i].guild} because of ${banList[i].reason}\n`;
                banMsg = banMsg + banBase;
            }
        }
        else if (banList == undefined) {
            banMsg = "No bans found."
        }
        else {
            banMsg = "Could not find bans";
        }
        msg.say(banMsg);


        // Look up kicks
        let kickList = kicks.prepare(`SELECT * FROM kicks WHERE user = ?`).all(userid.id);
        var kickMsg = `**Looking up kicks for ${userid.user.username}#${userid.user.discriminator}**\n`;

        if (kickList) {
            for (var i = 0; i < kickList.length; i++) {
                var kickBase = `Kicked by ${kickList[i].mod} in server ${kickList[i].guild} because of ${kickList[i].reason}\n`
                kickMsg = kickMsg + kickBase;
            }
        } else if (kickList == undefined) {
            kickMsg = `Could not find any kicks`;
        } else {
            kickMsg = `No kicks found`;
        }
        msg.say(kickMsg);

        // Look up warns
        let warnList = warns.prepare(`SELECT * FROM warns WHERE user = ?`).all(userid.id);
        var warnMsg = `**Looking up warns for ${userid.user.username}#${userid.user.discriminator}**\n`
        if (warnList) {
            for (var i = 0; i < warnList.length; i++) {
                var warnBase = `Warned by ${warnList[i].mod} in server ${warnList[i].guild} because of ${warnList[i].reason}\n`
                warnMsg = warnMsg + warnBase;
            }
        } 
        else if (warnList == undefined) {
            warnMsg = "No warns found."
        }
        else {
            warnMsg = "Could not find any warns"
        }
        msg.say(warnMsg);
    }
};

