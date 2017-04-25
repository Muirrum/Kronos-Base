const Discord = require("discord.js");
const client = new Discord.Client();
const VERSION = "0.10.4-beta.2";
const config = require("./config.json");
const roleName = config.modRole;
var prefix = config.prefix;
const got = require("got");
const music = require("discord.js-music");
const noisyDebug = false;



/*music(client, {
	prefix: "!@",
	anyoneCanSkip: "false",
});*/

music(client, config.prefix);
function getHttp(theUrl) {
  got(theUrl)
    .then(response => {
      console.log(response.body);
        //=> "<!doctype html>
    })
    .catch(error => {
      console.log(error.response.body);
        //=> "Internal server error ..."
    });

}

client.on("ready", () => {
  console.log("OtmasBot V" + VERSION + " has logged in and succesfully authenicated!");
});

if (config.greetPlayers == true) {
  client.on("guildMemberAdd", member => {

    let guild = member.guild;
    guild.defaultChannel.sendMessage(`${member.user.username} joined ${guild}`);

  });
}

client.on("guildCreate", guild => {
  guild.createRole({name: config.modRole}).catch(console.error);
  guild.defaultChannel.sendMessage("Thank you for choosing the OtmasBot! We hope you enjoy your time with us. The Mod role has been created as" + config.modRole);
  console.log(`The OtmasBot has expanded! Now a member of ${guild.name}`);
});

client.on("message", message => {

  //let command = message.content.split(" ")
  //command = command.slice(prefix.length)

  if (message.author.bot) return;
  //if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix + "ping")) {
    console.log("The bot works!");
    message.channel.sendMessage("pong!");
    if (noisyDebug) {
      message.channel.sendMessage("Current Ping:" + client.ping.toString());
    }
  }
  if (message.content.startsWith(prefix + "dog")) {
    var http = require("http");
    var url = "http://random.dog/woof";

    http.get(url, function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var fbResponse = body;
        message.channel.sendMessage("http://random.dog/" + fbResponse);
      });
    }).on("error", function (error) {
      console.log("Got an error: ", error);
      message.channel.sendMessage("Got an error" + error);
    });
  }
  if (message.content.startsWith(prefix + "cat")) {
    http = require("http");
    url = "http://random.cat/meow";

    http.get(url, function (res) {
      var body = "";

      res.on("data", function (chunk) {
        body += chunk;
      });

      res.on("end", function () {
        var fbResponse = JSON.parse(body);
        console.log("Got a response: ", fbResponse.file);
        message.channel.sendMessage(fbResponse.file);
      });
    }).on("error", function (errCat) {
      console.log("Got an error: ", errCat);
      errCat.message.channel.sendMessage(errCat.message.author.nickMention + ", Got an error " + errCat);
    });
 }
    if (message.content.startsWith(prefix + "cmds")) {
      var cmdtext = "Open commands are: \n -ping: Pong! \n -about: Displays some info. \n -authorInfo: Displays info about Otmas and Xavier Vernalls. \n -git: Sends you to the github Repository \n -trello: Gives you a link to the trello. \n -alive: Returns a message.";
      cmdtext = cmdtext.replace(/-/g,prefix);
      message.channel.sendMessage(cmdtext);
    }
    if (message.content.startsWith(prefix +"about")) {
      message.reply("This is OtmasBot Version " + VERSION + " which was coded by @Otmas in just over 5 minutes. For more info, or to report problems, don\"t message him. :D \n Our website can be found here: http://dev-otmas.surge.sh/otmasbot-index.html ");
    }else if (message.content.startsWith(prefix +"authorInfo")) {
      message.channel.sendMessage("This is totally not-lying information about @Otmas, the author of this bot. \n Otmas was personnaly responsible for the construction of SCPF Area-108.");
    }
    if (message.content.startsWith(prefix + "announce")) {
      let modRole = message.guild.find("name", roleName);
      if(message.member.roles.has(modRole)) {
        let args = message.content.split(" ");
        let annMsg = args.slice(1).join(" "); // remove first 2 args, then join array with a space
        if(noisyDebug) {
          console.log(annMsg);
        }
        message.guild.find("name", "announcements").sendMessage(annMsg);
      } else {
        message.reply(config.noPermsMsg);
      }

    }
    if (message.content.startsWith(prefix + "prefix")) {
      var args = message.content.split(" ");
      prefix = args[1];
    }
    if (message.content.startsWith(prefix + "git")) {
      message.reply("The github repo can be found at https://github.com/Oatmas64134/Otmas-Bot \n Please send all bug reports there, and not to Otmas");
    }
    if (message.content.startsWith(prefix + "kick")) {
      let modRole = message.guild.find("name", roleName);
      if(message.member.roles.has(modRole)) {
        let args = message.content.split(" ");
      //let userTarget = args[1];
        message.guild.member(args[1]).kick();
      } else {
        message.reply(config.noPermsMsg);
      }
    }
    if (message.content.startsWith(prefix + "alive")) {
      message.reply("Yes, I am alive.\nThank you for being concerned about me!");
    }
    if (message.content.startsWith(prefix + "trello")) {
      message.channel.sendMessage("The information trello can be found here: https://trello.com/b/dlVPh2TL/the-otmasbot");
    }
    if (message.content.startsWith(prefix + "servers")) {
      message.channel.sendMessage("Current servers the OtmasBot is connected to are the following \n" + client.guilds.toString());
    }
    if (message.content.startsWith(prefix + "ddos")) {
      let modRole = config.modRole;
      if(message.member.roles.has(modRole)) {
        let args = message.content.split(" ");
        let theUrl = args.slice(0);
        let times = args.slice(1);
        var timesDone;
        while (timesDone<times) {
          getHttp(theUrl);
        }
      } else {
        message.reply(config.noPermsMsg);
      }
    }

    if (message.content.startsWith(prefix + "gannounce")) {
      if(message.author.id !== "118455061222260736") {
        message.reply("Uh uh uh, nice try. You have been recorded, and you will be reprimanded!");
        console.log(`${message.author.username} just tried to global announce from ${message.guild.name}! Reprimand them at once!`);
        return;
      }
    }
    if(message.content.startsWith(prefix + "spam")) {
      if(message.member.roles.has(config.modRole)) {
        let args = message.content.split("");
        let spamMsg = args.split(2).join(" ");
        while (timesDone <= args[0]) {
          message.channel.sendMessage(spamMsg);
          timesDone++;
        }
        timesDone = 0;
      }

});

client.login(config.token);
