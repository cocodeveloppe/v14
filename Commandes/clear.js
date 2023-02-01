const Discord = require("discord.js")
const ms = require("ms")
module.exports = {

  name: "clear",
  description: "Efface beaucoup de messages",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  dm: false,
  category: "Modération",
  options: [
    {
      type: "number",
      name: "nombre",
      description: "Le nombre de message à supprimer",
      required: true
    }, 
    {
      type: "channel",
      name: "salon",
      description: "Le salon où effacer les messages.",
      required: false
    },
  ],

  async run(bot, message, args) {

    let channel = args.getChannel("salon")
    if(!channel) channel = message.channel;
    if(channel.id !== message.channel.id && !message.guild.channels.cache.get(channel.id)) return message.reply("Pas de salon !")

    let number = args.getNumber("nombre")
    if(parseInt(number) <= 0 || parseInt(number) > 100) return message.reply("Il nous faut un nombre entre `0` et `100` inclus !")


    try {

      let messages = await channel.bulkDelete(parseInt(number))

      await message.reply({content: `j'ai bien supprimé \`${messages.size}\` message(s) dans le salon ${channel} !`, ephemeral: true})

    } catch (err) {

      let messages = [...(await channel.messages.fetch()).values()].filter(msg => !msg.interaction && (Date.now() - msg.createdAt) <= 120900000)
      if(messages.length <= 0) return message.reply("Aucun message à supprimer car ils datent tous de plus de 14 jours !")
      await channel.reply(messages)

      await message.reply({content: `j'ai pu supprimé uniquement \`${message.length}\` message(s) dans le salon ${channel} car les autres dataient de plus de 14 jours !`, ephemeral: true})

    }
  }
}