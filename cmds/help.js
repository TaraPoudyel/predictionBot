const Discord = require("discord.js");

module.exports.run =  async (bot, msg, arg, con) => {

let target = msg.mentions.users.first() || msg.author;


const embed = new Discord.MessageEmbed()
.setTitle("Commands")
.addField('Basic',"help: this shit \n matches: list of matches you can predict \n predict: make prediction")
.setColor(0x02fdf5)
.setFooter("All commands are and will always be lowercase")
msg.channel.send(embed);



}

module.exports.help = {
name:"help"
}
