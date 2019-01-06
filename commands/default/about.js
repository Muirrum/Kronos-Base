const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class AboutCommand extends Command {
    constructor(client) {
        super(client, {
            name: "about",
            aliases: [],
            group: "default",
            memberName: "about",
            description: "Provides information about the bot",
            guildOnly: false,
            examples: ["\\about"]
        });
    }
    run(msg) {
        const embed = new RichEmbed()
            .setThumbnail("https://cdn.discordapp.com/attachments/362274609565007872/531289159080607754/kronos.jpg")
            .addField("Invite:", "https://bit.ly/2SGonmw")
            .addField("Author", "Dr. Everett Mann#2318")
            .addField("Version Control", "https://bit.ly/2LQQDQV")
            .addField("Issue Management", "http://bit.ly/2FbFQiI")
            .setTimestamp();
        return(msg.embed(embed));
    }
}