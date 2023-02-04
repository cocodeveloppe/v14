const Discord = require("discord.js")
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require("./Loader/loadCommands")
const loadEvents = require("./Loader/loadEvents")
const loadDatabase = require("./Loader/loadDatabase")
const config = require("./config")

bot.commands = new Discord.Collection()
bot.color = "#ffff";
bot.db = loadDatabase()

bot.login(config.token)
loadCommands(bot)
loadEvents(bot)

console.log("Base de données connectée  avec succès !")
