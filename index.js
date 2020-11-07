require('dotenv').config({
  path: '.env'
});

const { Bot } = require('./src/services/bot');
const { database } = require('./src/services/database');

database.run();

const bot = new Bot();
bot.run();

process.on('SIGINT', async () => {
  await bot.stop();
});
