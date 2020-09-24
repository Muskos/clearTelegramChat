require("dotenv").config({
    path: ".env",
});

const { Telegraf } = require('telegraf')
const { clearCallback, saveMessageId } = require('./src/clear')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('clear', clearCallback)

bot.on('message', saveMessageId)

bot.launch()