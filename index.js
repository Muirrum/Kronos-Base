const { CommandoClient } = require('discord.js-commando');
const path = require('path');

const SQLite = require("better-sqlite3");
// Define warn information DB
const bans = new SQLite('./db/bans.sqlite');

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
    client.user.setActivity("with time.");
    // Initialize tables
    const banstable = bans.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'bans';").get();
    if (!banstable['count(*)']) {
        // If it doesn't exist, create it
        bans.prepare("CREATE TABLE bans (id TEXT PRIMARY KEY AUTOINCREMENT, user TEXT, guild TEXT, mod TEXT, reason TEXT);").run();
        // Index the ID column
        bans.prepare("CREATE UNIQUE INDEX idx_bans_id ON bans (id);").run();
        bans.pragma("synchronous = 1");
        bans.pragma("journal_mod = wal");
    }
    console.log("Initialized successfully");
});

client.login(config.token);