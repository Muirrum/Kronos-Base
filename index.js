const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');
// Create DB directory
fs.mkdirSync(process.cwd() + "/db", {recursive: false}, (error) => {
    if (error) {
        console.log("couldn't create DB directory");
    } else {
        console.log ("created db directory");
    }
});

const SQLite = require("better-sqlite3");
// Define action information DB
const bans = new SQLite('./db/bans.sqlite');
const kicks = new SQLite('./db/kicks.sqlite');
const warns = new SQLite('./db/warns.sqlite');

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
    // Initialize ban tables
    const banstable = bans.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'bans';").get();
    if (!banstable['count(*)']) {
        // If it doesn't exist, create it
        bans.prepare("CREATE TABLE bans (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, guild TEXT, mod TEXT, reason TEXT);").run();
        // Index the ID column
        bans.prepare("CREATE UNIQUE INDEX idx_bans_id ON bans (id);").run();
        bans.pragma("synchronous = 1");
        bans.pragma("journal_mod = wal");

        client.getBans = bans.prepare("SELECT * FROM bans WHERE user = ?");
    }

    // Initialize KickDB
    const kickstable = kicks.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'kicks';").get();
    if(!kickstable['count(*)']) {
        kicks.prepare("CREATE TABLE kicks (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, guild TEXT, mod TEXT, reason TEXT);").run();
        kicks.prepare("CREATE UNIQUE INDEX idx_kicks_id ON kicks (id);").run();
        kicks.pragma("synchronous = 1");
        kicks.pragma("journal_mod = wal");
    }

    // Initialize WarnDB
    const warnsTable = warns.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'warns';").get();
    if(!warnsTable['count(*)']) {
        warns.prepare("CREATE TABLE warns (id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT, guild TEXT, mod TEXT, reason TEXT);").run();
        warns.prepare("CREATE UNIQUE INDEX idx_warns_id ON warns (id);").run();
        warns.pragma("synchronous = 1");
        kicks.pragma("journal_mod = wal");
    }

    console.log("Initialized successfully");
});

client.login(config.token);