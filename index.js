require("dotenv").config({
    path: ".env",
});

const fs = require('fs');

const { Telegraf } = require('telegraf')
const { clearCallback, saveMessageId, CHAT_FOLDER } = require('./src/clear')
const { setTimer } = require('./src/timeout')

const bot = new Telegraf(process.env.BOT_TOKEN)
const PORT = process.env.PORT || 3000;
const URL = process.env.URL

bot.telegram.setWebhook(`${URL}/bot${process.env.BOT_TOKEN}`);	bot.command('clear', clearCallback)
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, PORT)

if (!fs.existsSync(CHAT_FOLDER)){
    fs.mkdirSync(CHAT_FOLDER);
}

bot.command('clear', clearCallback)
bot.command('timeout', setTimer)

bot.help((ctx) => ctx.reply('/clear - отчистить все сообщения\n/timeout N - удалить сообщения через N минут'))

bot.on('message', saveMessageId)

bot.launch()