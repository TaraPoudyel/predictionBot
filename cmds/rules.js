const Discord = require("discord.js");

module.exports.run =  async (bot, msg, arg, con) => {

let target = msg.mentions.users.first() || msg.author;


const embed = new Discord.MessageEmbed()
.setTitle("Rules")
.addField('Basic',"1: You must be opt in For the prediction with a entry fee of $5 \n 2: Predections must be made 5 minutes before game start. \n 3: no change will be made to prediction after the game starts.\n 4: If you miss a week of prediction, its on you, money will not be refuned")
.setColor(0x02fdf5)
.setFooter("All rules must be follow")
msg.channel.send(embed);



}

module.exports.help = {
name:"rules"
}
