const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loader/loadCommands")
const loadEvents = require("./Loader/loadEvents")
const config = require("./config")

bot.commands = new Discord.Collection()
bot.color = "#ffff";

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)