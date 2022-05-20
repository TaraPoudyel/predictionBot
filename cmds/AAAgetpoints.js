const Discord = require("discord.js");

module.exports.run =  async (bot, msg, arg, con, week) => {
if(msg.guild.id != "786792521855477356") return;
if(arg.length > 2) return;
if (isNaN(arg[1])) return;
let fixture = arg[1];
let target = msg.author;
let sql;
sql = `SELECT * FROM matches WHERE fixture_id = '${fixture}'`
con.query(sql, (err, rows) => {
  if(err) throw err;
  if(rows.length == 0)
    {
      msg.channel.send("Incorrect fixture id")
    }
    else
    {
      let home = rows[0].home_score;
      let away = rows[0].away_score;
      msg.channel.send(home + " - " + away)
      if(err) throw err;
      let sql;
      sql = `UPDATE predictions SET result = '${1}' WHERE fixture_id = '${fixture}' AND home = '${home}' AND away = '${away}'`
      con.query(sql)

    }
})

}

module.exports.help = {
name:"getpoints"
}
