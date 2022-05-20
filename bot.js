const Discord = require("discord.js")
const bot = new Discord.Client();
const token = ""
const mysql = require("mysql");
const fs = require("fs");
const schedule = require('node-schedule');
const unirest = require('unirest');
var req = unirest("GET", "https://api-football-v1.p.rapidapi.com/v2/fixtures/h2h/33/39");

var prefix = ","
bot.cmds = new Discord.Collection();

fs.readdir("./cmds", (err, files) =>{
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0){
    console.log("No commands available")
  }
  console.log(`Loading ${jsfiles.length} commands`);
  jsfiles.forEach((f, i) => {
  let props = require(`./cmds/${f}`);
  console.log(`${f} loaded.`);
  bot.cmds.set(props.help.name, props);
});
});

var con = mysql.createConnection({
  host: "host",
  user: "username",
  password:"password",
  database: "databasename"
})

bot.on('ready', ()=> {
  console.log("The bot is on")
  bot.user.setActivity("Type ,help to get started.")

})

bot.on('message', msg => {
  if(msg.author.bot) return;
  setInterval(function(){
  con.query(`SELECT COUNT(*) FROM users`)
  }, 45000)
  if(!msg.content.startsWith(prefix)) return;
  let arg = msg.content.substring(prefix.length).split(" ");
  let week = 4;
  let commandfile = bot.cmds.get(arg[0]);
  if(commandfile) commandfile.run(bot, msg, arg, con, week);
})

bot.login(token);
