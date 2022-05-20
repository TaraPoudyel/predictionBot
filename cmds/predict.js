const Discord = require("discord.js");

module.exports.run =  async (bot, msg, arg, con, week) =>
{
  let target = msg.author;
  var time = 0n;
  let result = msg.content.split(/\D+/)
  result.shift();
  if(result.length != 3)
  {
    msg.channel.send("Incorrect syntax. Check syntax by typing ,syntax")
  }
  else
  {
    let match = result[0];
    let home = result[1];
    let away = result[2];
    con.query(`SELECT * FROM predictions WHERE user_id = '${msg.author.id}' AND id = '${match}' AND week = '${week}'`, (err, rows) => {
      if(rows.length == 0)
      {
        con.query(`SELECT * FROM matches WHERE id = '${match}' AND week = '${week}'`, (err, rows) => {
          if(err) throw err;
          if(rows.length == 0)
          {
            msg.channel.send("Incorrect fixture ID.")
            return;
          }
          if(!rows[0].event_time)
          {
            msg.channel.send("No time available")
          }
          else
          {
            fixture = rows[0].fixture_id
            time = rows[0].event_time
          }
          if(time > (Math.trunc(Date.now()/1000) + 300))
          {
            let sql;
            sql = `INSERT INTO predictions (user_id, home, away, fixture_id, home_name, away_name, id, week) VALUES
            ('${msg.author.id}', '${home}', '${away}', '${fixture}', '${rows[0].home_name}', '${rows[0].away_name}', '${match}', '${week}')`
            msg.channel.send("Prediction made, use ,mm to check your predictions")
            con.query(sql, console.log)
          }
          else
          {
            msg.channel.send("The prediction period for this match is over.")
          }
        })
      }
      else
        {
          if(time > (Math.trunc(Date.now()/1000) + 300)) return;
          let updateId = rows[0].prediction_id;
          sql = `UPDATE predictions SET home = '${home}', away = '${away}' WHERE prediction_id = ${updateId}`
          msg.channel.send("Prediction changed")
          con.query(sql)
        }
    })
  }
}
module.exports.help = {
name:"predict"
}
