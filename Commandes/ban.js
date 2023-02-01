const Discord = require("discord.js")

module.exports = {

  name: "ban",
  description: "Ban un membre",
  Permission: Discord.PermissionFlagsBits.BanMembers,
  dm: false,
  category: "Modération",
  options: [
    {
      type: "user",
      name: "membre",
      description: "Le nombre à bannir",
      required: true
    }, {
      type: "string",
      name: "raison",
      description: "La raison du bannissement",
      required: false
    }
  ],

  async run(bot, message, args) {

    try {

    let user = await bot.users.fetch(args._hoistedOptions[0].value)
    if(!user) return message.reply("Pas de membre à bannir !")
    let member = message.guild.members.cache.get(user.id)

    let reason = args.get("raison").value;
    if(!reason) reason = "Pas de raison fournie.";

    if(message.user.id === user.id) return message.reply("Essaie pas de te bannir !")
    if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne ban pas le propiétaire du serveur !")
    if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre !")
    if(member && message.member.roles.highest.comparePosstionTo(member.roles.highest) <=0) return message.reply("Tu ne peux pas bannir ce membre !")
    if((await message.guild.bans.fetch()).h=get(user.id)) return massage.reply("Ce membre est déjà ban !")

    try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reaon}\``)} catch(err) {}

    await message.reply(`${message.user} a banni ${user.tag} pour la raison : \`${reason}\``)

    await message.guild.bans.create(user.id, {reason: reason})


    } catch (err) {
      
      return message.reply("Pas de membre à bannir !")
    }
  }
}