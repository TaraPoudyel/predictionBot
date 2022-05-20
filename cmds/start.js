const Discord = require("discord.js");

module.exports.run =  async (bot, msg, arg, con) => {
let target = msg.author;

con.query(`SELECT * FROM users WHERE user_id = '${target.id}'`, (err, rows) => {
  if(err) throw err;
  if( !rows[0]) {
    let sql;
    sql = `INSERT INTO users (user_id, points, user_name) VALUES ('${msg.author.id}', '${'0'}', '${msg.author.username}')`
    con.query(sql, console.log)
    const embed = new Discord.MessageEmbed()
    .addField('Success',"You have successfully registered and can now start making predictions")
    .setColor(0x02fdf5)
    msg.channel.send(embed);
  }
  else {
    msg.reply("You are already registered.")
  }
})


}

module.exports.help = {
name:"start"
}
