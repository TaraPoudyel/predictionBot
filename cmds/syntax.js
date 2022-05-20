const Discord = require("discord.js");

module.exports.run =  async (bot, msg, arg, con) => {

let target = msg.mentions.users.first() || msg.author;


const embed = new Discord.MessageEmbed()
.setTitle("Syntax")
.addField("Basic Syntax:",',predict (match id) (home score)-(away score)')
.addField("Example:",',predict 1 2-3')
.setColor(0x02fdf5)
.setFooter("You can get match id by doing ,matches")
msg.channel.send(embed);



}

module.exports.help = {
name:"syntax"
}
