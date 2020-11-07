const sqlite3 = require('sqlite3').verbose();
const util = require('util');
const { Message } = require('../models/message');

class Database {
  constructor() {
    this.db = new sqlite3.Database('./messages.db', err => {
      if (err) {
        console.error(err.message);
      }
      console.log('Connected to the users.db database.');
    });

    this.db.serialize(() => {
      this.db.run(
        'CREATE TABLE IF NOT EXISTS messages(chatId text, messageId text, createdAt datetime)',
        err => {
          if (err) {
            console.log(err);
            throw err;
          }
        }
      );
    });

    this.db.run = util.promisify(this.db.run);
    this.db.get = util.promisify(this.db.get);
    this.db.all = util.promisify(this.db.all);
  }

  saveMessage(message) {
    const date = new Date();
    this.db.run(
      `INSERT INTO messages(chatId, messageId, createdAt)
            VALUES(
                ${message.chat.id},
                ${message.message_id},
                ${date.getTime()})
      `,
      err => {
        if (err) {
          console.log(err);
          throw err;
        }
      }
    );
  }

  async getMessagesByChatId(chatId) {
    const messages = await this.db.all(
      `SELECT messageId FROM messages WHERE chatId = ${chatId}`
    );

    return messages.map(item => new Message(item));
  }

  async getMessagesByTimeOut(chatId, timeout) {
    const messages = await this.db.all(
      `SELECT messageId, createdAt FROM messages WHERE chatId = ${chatId}`
    );

    return messages.filter(item => {
      const currentDate = new Date();
      const timestampToDelete = currentDate.getTime() + timeout * 1000;
      console.log(
        item.createdAt,
        timestampToDelete,
        item.createdAt < timestampToDelete
      );
      return new Message(item);
    });
  }

  async getAllChatsId() {
    const chatsId = await this.db.all('SELECT chatId from messages');
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    return chatsId.map(item => item.chatId).filter(onlyUnique);
  }

  deleteMessagesByChatId(chatId) {
    const deleteSQL = 'DELETE from messages WHERE chatId = ?';

    this.db.run(deleteSQL, [chatId], err => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) deleted: ${this.changes}`);
    });
  }

  run() {
    console.log('start');
  }
}

const database = new Database();

module.exports = {
  database
};
