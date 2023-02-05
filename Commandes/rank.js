const Discord = require("discord.js")
const Canvas = require("discord-canvas-easy")

module.exports = {

  name: "rank",
  description: "Donne de l'xp d'un membre",
  Permission: "Aucune",
  dm: false,
  category: "Expérience",
  options: [
    {
      type: "user",
      name: "utilisateur",
      description: "L'xp du membre a voir",
      required: false,
      autocomplete: false
    },
  ],

  async run(bot, message, args, db) {

    let user;
    if(args.getUser("utilisateur")) {
      user = args.getUser("utilisateur")
      if(!user || !message.guild.members.cache.get(user?.id)) return message.reply("Pas de membre !")
    } else user = message.user;

    db.query(`SELECT * FROM xp WHERE guild = '${message.guildId}' AND user = '${user.id}'`, async (err, req) => {

      db.query(`SELECT * FROM xp WHERE guild= '${message.guildId}'`, async (err, all) => {

      if(req.length < 1) return message.reply("Ce membre n'a pas d'xp !")

      await message.deferReply()

      const calculXp = (xp, level) => {

        let xptotal =0;
        for(let i = 0; i < level + 1; i++) xptotal += i * 1000
        xptotal += xp;
        return xptotal;
      }

      let leaderboard = await all.sort(async (a, b) => calculXp(parseInt(b.xp), parseInt(b.level)) - calculXp(parseInt(a.xp), parseInt(a.level)))
      let xp = parseInt(req[0].xp)
      let level = parseInt(req[0].level)
      let rank = all.findIndex(r => r.user === user.id) + 1
      let need = (level + 1) * 1000;

      let Card = await new Canvas.Card()
      .setBackground("https://foot11.com/wp-content/uploads/2022/04/Kylian-Mbappe-recoit-des-excuses-de-Winamax.-IconSport-e1649927757440.jpeg")
      .setBot(bot)
      .setColorFont("#ffffff")
      .setRank(rank)
      .setUser(user)
      .setColorProgressBar("#ff0000")
      .setGuild(message.guild)
      .setXp(xp)
      .setLevel(level)
      .setXpNeed(need)
      .toCard()

      await message.followUp({files: [new Discord.AttachmentBuilder(Card.toBuffer(), {name: "rank.png"})]})
    })
    })
  }
}