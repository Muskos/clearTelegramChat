require("dotenv").config({
    path: ".env",
});

const { Telegraf } = require('telegraf')

const PORT = process.env.PORT || 3000;
const URL = process.env.URL

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.telegram.setWebhook(`${URL}/bot${process.env.BOT_TOKEN}`);
bot.startWebhook(`/bot${process.env.BOT_TOKEN}`, null, PORT)

let messagesID = [];

bot.command('clear', async (ctx) => {
    try {
        for (item of messagesID) {
            ctx.telegram.deleteMessage(item.chatId, item.messageId)
        }
        ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
    } catch {
        ctx.reply('Error: удаляй руками')
    }

    messagesID = []
})

bot.on('message', (ctx) => {
    messagesID.push({
        messageId: ctx.message.message_id,
        chatId: ctx.message.chat.id
    })
})

bot.launch()