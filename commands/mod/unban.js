const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class WarnCommand extends Command {
    constructor(client) {
        super(client, {
            name: "unban",
            group: "mod",
            memberName: "unban",
            description: "Unbans a user from the server",
            guildOnly: true,
            args: [
                {
                    key: 'userid',
                    prompt: "ID of who you want to unban?",
                    type: 'string'
                }
            ],
            examples: ["\\warn @Dr. Everett Mann TOO MANY SNEKS"],
            userPermissions: ["BAN_MEMBERS"]
        });
    };

    run (msg, { userid }) {
        msg.reply(userid);
        msg.guild.unban(userid);
        msg.reply(`Unbanned ${userid}`);
    }
};

