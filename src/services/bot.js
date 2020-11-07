const { Telegraf } = require('telegraf');
const { clearCallback, saveMessageId } = require('../commands/clear');
const { setTimer } = require('../commands/timeout');
const { database } = require('../services/database');

class Bot {
  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN);
    this.bot.command('clear', clearCallback);

    this.bot.command('clear', clearCallback);
    this.bot.command('timeout', setTimer);

    this.bot.help(async ctx => {
      const botMessage = await ctx.reply(
        '/clear - отчистить все сообщения\n'
        // + '/timeout N - удалить сообщения через N минут'
      );

      saveMessageId(ctx);
      saveMessageId({ message: botMessage });
    });

    this.bot.on('message', saveMessageId);
  }

  run() {
    this.bot.launch();
  }

  async stop() {
    const chatsId = await database.getAllChatsId();
    chatsId.forEach(chatId => {
      this.bot.telegram.sendMessage(
        chatId,
        'Бот временно остановлен. Все сообщения добавленные после остановки не будут удалены'
      );
    });
  }
}

module.exports = {
  Bot
};
