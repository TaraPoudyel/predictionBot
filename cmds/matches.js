const Discord = require("discord.js");

module.exports.run =  async (bot, msg, arg, con, week) => {
let target = msg.author;
let sql;
sql = `SELECT * FROM matches WHERE week = '${week}' ORDER BY id`

const embed = new Discord.MessageEmbed()
.setColor(0x33ffff)
.setTitle("This weeks matches:")
con.query(sql, (err, rows) => {
  let numberOfMatches = rows.length;
  for(i = 0; i < numberOfMatches; i++)
    {
      embed.addField(rows[i].id, rows[i].home_name + " VS " + rows[i].away_name)
    }
    embed.setFooter("Use ,predict to predict scores")
    msg.channel.send(embed);
})

}

module.exports.help = {
name:"matches"
}
