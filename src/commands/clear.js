const { database } = require('../services/database');

const CHAT_FOLDER = 'data';

const clear = async (ctx, timeout) => {
  const chatId = ctx.message.chat.id;

  try {
    let messages = [];
    if (!timeout) {
      messages = await database.getMessagesByChatId(chatId);
    } else {
      messages = await database.getMessagesByTimeOut(chatId, timeout);
    }

    for (const item of messages) {
      if (item) {
        ctx.telegram.deleteMessage(chatId, item.messageId);
      }
    }

    database.deleteMessagesByChatId(chatId);
  } catch (error) {
    console.log(error);
  }
};

const clearCallback = async ctx => {
  clear(ctx);

  ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
};

const saveMessageId = async ctx => {
  try {
    database.saveMessage(ctx.message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = Object.assign(
  {},
  {
    clearCallback,
    saveMessageId,
    clear,
    CHAT_FOLDER
  }
);
