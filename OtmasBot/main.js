const Discord = require('discord.js');
const client = new Discord.Client();
const VERSION = "0.5.1"
const config = require('./config.json');
const roleName = config.modRole
const prefix = config.prefix

client.on('ready', () => {
  console.log('OtmasBot V0.5.1 has logged in and succesfully authenicated, Lord Otmas!');
});



client.on('message', message => {

  let command = message.content.split(' ')
  command = command.slice(config.prefix.length)

  if (message.author.bot) return;
  //if (!message.content.startsWith(prefix)) return;
  
  if (message.content.startsWith(config.prefix + 'ping')) {
    console.log('The bot works!')
    message.channel.sendMessage('pong!');
  }
  if (message.content.startsWith(config.prefix + 'cmds')) {
      message.channel.sendMessage('Open commands are: \n -ping: Pong! \n -about: Displays some info. \n -authorInfo: Displays info about Otmas and Xavier Vernalls. \n -git: Sends you to the github Repository');
  }
  if (message.content.startsWith(config.prefix +'about')) {
    message.reply('This is OtmasBot Version ' + VERSION + " which was coded by @Otmas in just over 5 minutes. For more info, or to report problems, don't message him. :D ")
  }
  if (message.content.startsWith(config.prefix +'authorInfo')) {
    message.channel.sendMessage('This is totally not-lying information about @Otmas, the author of this bot.')
    message.channel.sendMessage('Otmas was born in the United States of Otmas, in the city of Otmasington D.C.')
    message.channel.sendMessage('He started programming at the early age of 0 months.')
    message.channel.sendMessage('He made his first malevolent AI at the age of 1 month')
    message.channel.sendMessage('He is also responsible for the destruction of SCP-666 and is personally responsible for the construction of SCPF Site-61')
  }
  if (message.content.startsWith(prefix + 'announce')) {
    let modRole = message.guild.find('name', roleName);
    if(msg.member.roles.has(modRole)) {
       let args = message.content.split(' ')
   		 let annMsg = args.slice(1).join(" "); // remove first 2 args, then join array with a space
    	console.log(annMsg)
    	client.channels.get("251488086813442051").sendMessage(annMsg)
    } else {
  		message.reply("Sorry bud, but you don't have the perms to do this.");
		}
   
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
		let modRole = message.guild.find('name', roleName);
		if(message.member.roles.has(modRole)) {
    	let args = message.content.split(' ')
    	let userTarget = args[1]
   	  message.guild.member(args[1]).kick()
		} else {
			message.reply("You honestly thought you could do this? Welp, you can't")
  }
  }
    if (message.content.startsWith(prefix + 'alive')) {
	message.reply('Yes, I am alive.\nThank you for being concerned about me!')
    }
});

client.login(config.token);
