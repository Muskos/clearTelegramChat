const fs = require('fs').promises;

const CHAT_FOLDER = 'data'
const ENCODE = 'utf8'
const FILE_FORMAT = 'txt'

const clear = async (ctx) => {
    const chatId = ctx.message.chat.id

    try {
        const data = await fs.readFile(`${CHAT_FOLDER}/${chatId}.${FILE_FORMAT}`, ENCODE);
        const messageIdArr = data.split(',')

        for (item of messageIdArr) {
            if (item) {
                ctx.telegram.deleteMessage(chatId, item)
            }
        }
        fs.writeFile(`${CHAT_FOLDER}/${chatId}.${FILE_FORMAT}`, '')
    } catch (error) {
        console.log(error)
    }
}

const clearCallback = async (ctx) => {
    clear(ctx)

    ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
}

const saveMessageId = async (ctx) => {
    try {
        await fs.appendFile(`${CHAT_FOLDER}/${ctx.message.chat.id}.${FILE_FORMAT}`, `${ctx.message.message_id},`); // need to be in an async function
    } catch (error) {
        console.log(error)
    }
}

module.exports = Object.assign({}, {
    clearCallback,
    saveMessageId,
    clear,
    CHAT_FOLDER
})