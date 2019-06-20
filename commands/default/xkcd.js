const { Command } = require('discord.js-commando');
const http = require('http');

module.exports = class XkcdCommand extends Command {
    constructor(client) {
        super(client, {
            name: "xkcd",
            aliases: [],
            group: "default",
            memberName: "xkcd",
            description: "Fetches an XKCD comic strip and embeds the image in the response",
            guildOnly: false,
            examples: ["xkcd 1470"],
            args: [
                {
                    key: 'number',
                    prompt: "Which XKCD comic do you want to view?",
                    type: "string"
                }
            ]
        });
    }

    run(msg, { number }) {
        var url = `http://xkcd.com/${number}/info.0.json`

        http.get(url, function(res) {
            var { statusCode } = res;
            if (statusCode != 200) {
                msg.reply("There was an error fetching the XKCD.");
                return;
            }
            let data = '';
            res.on('data', (chunk => { data += chunk}));
            res.on('end', () => {
                try {
                    var parsedData = JSON.parse(data);
                    console.log(parsedData);
                } catch (e) {
                    message.reply("Error parsing JSON data. Please alert a developer.")
                    console.error(e.message);
                }
            })
        })
    }
}