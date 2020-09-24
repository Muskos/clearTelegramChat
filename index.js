require("dotenv").config({
    path: ".env",
});

const { Telegraf } = require('telegraf')
const { clearCallback, saveMessageId } = require('./src/clear')
const { setTimer } = require('./src/timeout')

const bot = new Telegraf(process.env.BOT_TOKEN)
const PORT = process.env.PORT || 3000;
const URL = process.env.URL

bot.telegram.setWebhook(`${URL}/bot${process.env.BOT_TOKEN}`);	bot.command('clear', clearCallback)
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, PORT)

bot.command('clear', clearCallback)
bot.command('timeout', setTimer)

bot.on('message', saveMessageId)

bot.launch()