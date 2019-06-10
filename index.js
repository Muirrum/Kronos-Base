const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const config = require("./config.json");

const client = new CommandoClient({
    commandPrefix: config.prefix,
    owner: "118455061222260736",
    disableEveryone: true
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['default', "Default"],
        ['mod', "Moderation"],
        ['owner', "Owner-only"]
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on("ready", () => {
    console.log("Initialized successfully");
    client.user.setActivity("with time.");
});

client.login(config.token);