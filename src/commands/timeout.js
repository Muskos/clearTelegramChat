const { saveMessageId } = require('./clear');
const { database } = require('../services/database');

const setTimer = async ctx => {
  saveMessageId(ctx);
  const chatId = ctx.message.chat.id;
  const settings = await database.getSettingsByChatId(chatId, 'timeout');
  const timer = Number(ctx.message.text.substring(9));

  if (!settings[0]) {
    database.saveSettings({
      chatId,
      setting: 'timeout',
      value: timer
    });
  } else {
    database.updateSettings({
      chatId,
      setting: 'timeout',
      value: timer
    });
  }
};

module.exports = Object.assign(
  {},
  {
    setTimer
  }
);
