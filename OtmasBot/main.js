const Discord = require('discord.js');
const client = new Discord.Client();
const user = client;
const VERSION = "0.6.6"
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}



client.on('ready', () => {
    console.log('OtmasBot V0.6.6 has logged in and succesfully authenicated, Lord Otmas!');

});

client.on('guildMemberAdd', () => {
});  

client.on('reconnecting', () => {
    console.log('The bot disconnected, but succesfully reconnected!')
});

client.on('message', message => {
  var prefix = "█"
  if (message.author.bot) return;
  //if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + 'ping')) {
    console.log('The bot works!')
    message.channel.sendMessage('pong!');
  }
  if (message.content.startsWith(prefix + 'cmds')) {
    message.channel.sendMessage('Open commands are:')
    message.channel.sendMessage('-ping: Pong!')
    message.channel.sendMessage('-about: Displays some info.')
    message.channel.sendMessage('-authorInfo: Displays some totally true info about @Otmas')
      message.channel.sendMessage('-git: Sends you to the github repository')
      message.channel.sendMessage('-invite: gives you a link to invite the bot to your server')  
  }
  if(message.content === prefix + 'cat') {	
			var jsonfile = httpGet('http://random.cat/meow')
			var jsdc = JSON.parse(jsonfile);
			message.channel.sendMessage(jsdc.file);
  	} else if(message.content === prefix + 'dog') {	
			var txt = httpGet('http://random.dog/woof')
			message.channel.sendMessage('http://random.dog/' + txt);
	}
  if (message.content.startsWith(prefix + 'about')) {
    message.reply('This is OtmasBot Version ' + VERSION + " which was coded by <@118455061222260736> with some help from <@129280647633174528> in just over 5 minutes. For more info, or to report problems, don't message him. :D ")
  }
  if (message.content.startsWith(prefix + 'authorInfo')) {
    message.channel.sendMessage('This is totally not-lying information about @Otmas, the author of this bot.')
    message.channel.sendMessage('Otmas was born in the United States of Otmas, in the city of Otmasington D.C.')
    message.channel.sendMessage('He started programming at the early age of 0 months.')
    message.channel.sendMessage('He made his first malevolent AI at the age of 1 month')
    message.channel.sendMessage('He is also responsible for the destruction of SCP-666 and is personally responsible for the construction of SCPF Site-61')
	message.channel.sendMessage('Xavier also did some stuff too. I promise. Totes not trying to get fame. 100%. Lots of love. xoxox')
  }
  if (message.content.startsWith(prefix + 'announce')) {

    let args = message.content.split(' ')
    let annMsg = args.slice(1).join(" "); // remove first 2 args, then join array with a space
    console.log(annMsg)
      message.guild.channels.find("name", "announcements").sendMessage(annMsg);

  }
  if (message.content.startsWith(prefix + 'prefix')) {

    let args = message.content.split(' ')
    prefix = args[1]
  }
  if (message.content.startsWith(prefix + 'git')) {
    message.reply('The github repo can be found at https://github.com/Oatmas64134/Otmas-Bot')
    message.reply('Please send all bug reports there, and not to Otmas')
  }
  if (message.content.startsWith(prefix + 'kick')) {
      let modRole = message.guild.roles.find("name", "OtmasBot Commander")
      if (message.member.roles.has(modRole.id)) {
	  let args = message.content.split(' ')
	  let userTarget = args[1]
	  message.guild.member(args[1]).kick()
      } else {
	  message.reply("Heh. You honestly thought that you could do this? Welp, you can't.")
  }
    if (message.content.startsWith(prefix + 'uptime')) {
	message.reply(client.uptime)
	console.log('Almighty Otmas, the current uptime is:' + client.uptime)
    }
    if (message.content.startsWith(prefix + 'nickname')) {
	let args = message.content.split(' ' )
	let botNick = args.slice(1).join(" ")
        var bot = Discord.GuildMember
	message.guild.members.get("247865503064915978").setNickname(botNick);
	console.log(botNick)
    }
  }
    if (message.content.startsWith(prefix + 'eval')) {
        if(message.author.id !== "118455061222260736") return;
	try {
	    let args = message.content.split(' ')
	    var code = args.join(" ");
	    var evaled = eval(code);

	    if (typeof evaled !== "string")
		evaled = require("util").inspect(evaled);

	    message.channel.sendCode("xl", clean(evaled));
	} catch(err) {
	    message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
	}

    }
    if (message.content.startsWith(prefix + 'invite')) {
	message.reply('Thank you for liking the bot so much that you want to invite it to your server!\nInvite Link: https://tinyurl.com/hr3rucj')
    }
   // if (message.content = ('kys') {
//	message.delete();
  //  }
	}); //END MSG HANDLER
	function clean(text) {
	    if (typeof(text) === "string")
		return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
	    else
		return text;
	}

client.on('guildCreate', guild => {
    console.log("The OtmasBots reach has expanded to ${guild.name}, formerly owned by ${guild.owner.user.username}")
    guild.defaultChannel.sendMessage("Thank you for using The Otmas Bot, developed by Otmas in 2016.")
    guild.defaultChannel.sendMessage("To use all mod-specific commands, please create a role titled 'OtmasBot Commander'. If you do not have this role, one will be created for you.")
    guild.createRole({ name: 'OtmasBot Commander' })
});


client.login('[DATA EXPUNGED]');
