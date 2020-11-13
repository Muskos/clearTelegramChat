const { database } = require('../services/database');
const { Message } = require('../models/message');

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
        ctx.telegram.deleteMessage(chatId, item.messageId).then(response => {
          if (response === true) {
            database.deleteMessage(chatId, item.messageId);
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const clearByTimeout = async bot => {
  const settings = await database.getSettings('timeout');
  settings.forEach(async item => {
    const messages = await database.getMessagesByTimeOut(
      item.chatId,
      item.value
    );
    deleteMessages(bot, messages);
  });

  const messages = await database.getMessagesWithTimeOut();
  deleteMessages(bot, messages);
};

const deleteMessages = (bot, messages) => {
  for (const message of messages) {
    if (message) {
      bot.telegram
        .deleteMessage(message.chatId, message.messageId)
        .then(response => {
          if (response === true) {
            database.deleteMessage(message.chatId, message.messageId);
          }
        });
    }
  }
};

const clearCallback = async ctx => {
  clear(ctx);

  ctx.telegram.deleteMessage(ctx.message.chat.id, ctx.message.message_id);
};

const saveMessageId = async ctx => {
  try {
    database.saveMessage(new Message(ctx.message));
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
    clearByTimeout
  }
);
