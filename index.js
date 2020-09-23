require("dotenv").config({
    path: ".env",
});

const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.BOT_TOKEN)
let messagesID = [];

bot.command('clear', async (ctx) => {
    try {
        for (item of messagesID) {
            ctx.telegram.deleteMessage(item.chatId, item.messageId)
        }
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