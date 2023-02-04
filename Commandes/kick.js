const Discord = require("discord.js")

module.exports = {

  name: "kick",
  description: "kick un membre",
  Permission: Discord.PermissionFlagsBits.KickMembers,
  dm: false,
  category: "Modération",
  options: [
    {
      type: "user",
      name: "membre",
      description: "Le nombre à kick",
      required: true,
      autocomplete: false
    }, {
      type: "string",
      name: "raison",
      description: "La raison du kick",
      required: false,
      autocomplete: false
    }
  ],

  async run(bot, message, args) {


    let user = await bot.users.fetch(args._hoistedOptions[0].value)
    if(!user) return message.reply("Pas de membre à kick !")
    let member = message.guild.members.cache.get(user.id)
    if(!member) return message.reply("Pas de membre a kick !")

    let reason = args.getString("raison");
    if(!reason) reason = "Pas de raison fournie.";

    if(message.user.id === user.id) return message.reply("Essaie pas de te kick !")
    if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne ban pas le propiétaire du serveur !")
    if(member && !member.bannable) return message.reply("Je ne peux pas kick ce membre !")
    if(member && message.member.roles.highest.comparePosstionTo(member.roles.highest) <=0) return message.reply("Tu ne peux pas kick ce membre !")
    if((await message.guild.bans.fetch()).h=get(user.id)) return massage.reply("Ce membre est déjà kick !")

    try {await user.send(`Tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reaon}\``)} catch(err) {}

    await message.reply(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

    await member.kick(reason)
  }
}