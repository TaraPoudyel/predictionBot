const unirest = require("unirest");
const Discord = require("discord.js");

module.exports.run =  async (bot, msg, arg, con) => {
if (msg.guild.id != "786792521855477356") return;
if(arg.length > 2) return;
if (isNaN(arg[1])) return;


let target = msg.author;

var req = unirest("GET", "https://api-football-v1.p.rapidapi.com/v2/fixtures/id/" + fixture);

req.query({
	"timezone": "America/New_York"
});

req.headers({
	"x-rapidapi-key": "key",
	"x-rapidapi-host": "host",
	"useQueryString": true
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body.api.fixtures[0].score.fulltime);
	let result = res.body.api.fixtures[0].score.fulltime.split("-");
	console.log(result)
	home = result[0];
	away = result[1];
	let sql;
	sql = `UPDATE matches SET home_score = '${home}', away_score = '${away}' WHERE fixture_id = '${fixture}'`
	con.query(sql)
});



}

module.exports.help = {
name:"getscore"
}
// 157034
