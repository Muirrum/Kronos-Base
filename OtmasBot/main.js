const Discord = require('discord.js');
const client = new Discord.Client();
const user = client;
const VERSION = "0.5.3"


client.on('ready', () => {
    console.log('OtmasBot V0.5.1 has logged in and succesfully authenicated, Lord Otmas!');

});

client.on('guildMemberAdd', () => {
});  
client.on('guildCreate', () => {
    console.log('The OtmasBot has been added to a server!')
    console.log('Server name:' + guild )
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
  }
  if (message.content.startsWith(prefix + 'about')) {
    message.reply('This is OtmasBot Version ' + VERSION + " which was coded by @Otmas in just over 5 minutes. For more info, or to report problems, don't message him. :D ")
  }
  if (message.content.startsWith(prefix + 'authorInfo')) {
    message.channel.sendMessage('This is totally not-lying information about @Otmas, the author of this bot.')
    message.channel.sendMessage('Otmas was born in the United States of Otmas, in the city of Otmasington D.C.')
    message.channel.sendMessage('He started programming at the early age of 0 months.')
    message.channel.sendMessage('He made his first malevolent AI at the age of 1 month')
    message.channel.sendMessage('He is also responsible for the destruction of SCP-666 and is personally responsible for the construction of SCPF Site-61')
  }
  if (message.content.startsWith(prefix + 'announce')) {

    let args = message.content.split(' ')
    let annMsg = args.slice(1).join(" "); // remove first 2 args, then join array with a space
    console.log(annMsg)
    client.channels.get("251488086813442051").sendMessage(annMsg)

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
    let args = message.content.split(' ')
    let userTarget = args[1]
    message.guild.member(args[1]).kick()
  }
    if (message.content.startsWith(prefix + 'uptime')) {
	message.reply(client.uptime)
	console.log('Almighty Otmas, the current uptime is:' + client.uptime)
    }	


});

client.login('MjQ3ODY1NTAzMDY0OTE1OTc4.CwvaPw._YWA7uj59xcdnNb-Ft8A_ketOuM');
