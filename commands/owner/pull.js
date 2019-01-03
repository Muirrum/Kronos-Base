const { Command } = require('discord.js-commando');
const shell = require('shelljs');

module.exports = class PullCommand extends Command {
    constructor(client) {
        super(client, {
            name: "pull",
            aliases: ['pull'],
            group: "owner",
            memberName: "pull",
            description: "Provides information about the current server",
            guildOnly: true,
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
            if (err !== null) {
                msg.say("Encountered an error while pulling.")
                msg.say(err);
            } else {
                msg.say("Pull complete.")
            }
        })
    }
}