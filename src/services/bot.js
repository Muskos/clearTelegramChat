const { Telegraf } = require('telegraf');
const {
  clearCallback,
  saveMessageId,
  clearByTimeout
} = require('../commands/clear');
const { setTimer } = require('../commands/timeout');
const { database } = require('../services/database');

const TIME_OUT = 1000;

class Bot {
  constructor() {
    this.bot = new Telegraf(process.env.BOT_TOKEN);

    this.bot.command('clear', clearCallback);
    this.bot.command('timeout', setTimer);

    this.bot.help(async ctx => {
      const botMessage = await ctx.reply(
        'Бот удаляет сообщения по команде, по таймеру или по хештегу\n' +
          'Так же в связи с ограничением Телеграма бот не может удалить сообщения старше 2ух дней\n' +
          'Поэтому сообщения будут автоматически удаляться через 47 часов\n' +
          '/clear - отчистить все сообщения\n' +
          '/timeout N - удалить сообщения через N минут\n' +
          '#timeoutN - оставляя хештег в сообщении - удалит сообщение через N минут'
      );

      saveMessageId(ctx);
      saveMessageId({ message: botMessage });
    });

    this.bot.on('message', saveMessageId);
    this.timoutId = null;
  }

  run() {
    this.bot.launch();
    this.runTimer();
  }

  runTimer() {
    this.timeoutId = setTimeout(() => {
      clearByTimeout(this.bot);
      clearTimeout(this.timeoutId);
      this.runTimer();
    }, TIME_OUT);
  }

  async stop() {
    const chatsId = await database.getAllChatsId();
    chatsId.forEach(async chatId => {
      const botMessage = await this.bot.telegram.sendMessage(
        chatId,
        'Бот временно остановлен. Все сообщения добавленные после остановки не будут удалены'
      );
      saveMessageId({ message: botMessage });
    });
    clearTimeout(this.timeoutId);
  }
}

module.exports = {
  Bot
};
