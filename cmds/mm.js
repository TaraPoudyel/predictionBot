const Discord = require("discord.js");

module.exports.run =  async (bot, msg, arg, con, week) => {
let target = msg.author;
let sql;
var homeTeam;
var awayTeam;
const embed = new Discord.MessageEmbed()
.setColor(0x33ffff)
.setTitle("Your predictions:")
sql = `SELECT * FROM predictions WHERE user_id = '${msg.author.id}' AND week = '${week}'`
con.query(sql, (err, rows) => {
  if(rows.length > 0)
  {
    for(i = 0; i < rows.length; i++)
    {
      embed.addField(rows[i].home_name + " vs " + rows[i].away_name, rows[i].home + " - " + rows[i].away)
    }
    msg.channel.send(embed)
  }
  else
  {
    msg.channel.send("you have no predictions.")
  }
})

}

module.exports.help = {
name:"mm"
}
