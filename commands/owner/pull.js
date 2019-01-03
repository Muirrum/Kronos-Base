const { Command } = require('discord.js-commando');
const shell = require('shelljs');

module.exports = class PullCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pull",
            aliases: ['pull'],
            group: "owner",
            memberName: "pull",
            description: "Pulls new code from GitHub",
            guildOnly: false,
            examples: ["\\pull"]
        });
    }

    hasPermission(msg) {
        if(this.client.isOwner(msg.author)) {
            return true;
        } else {
            return "Only the bot owner may use this command";
        }
    }

    run(msg) {
        msg.say("Pulling data from GitHub...");
        shell.exec("git pull", function(err) {
            if (err !== 0) {
                msg.say("Encountered an error while pulling.")
                msg.say(err);
            } else {
                msg.say("Pull complete.")
            }
        })
    }
}