const { Message } = require('../models/message');

class MessagesBase {
  constructor(db) {
    this.db = db;
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
  }

  saveMessage(message) {
    console.log(message);
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
      `SELECT chatId, messageId, createdAt FROM messages WHERE chatId = ${chatId}`
    );

    return messages
      .filter(item => {
        const currentDate = new Date();
        const timestampToDelete = currentDate.getTime() - timeout * 1000 * 60;

        return item.createdAt < timestampToDelete;
      })
      .map(item => new Message(item));
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

  deleteMessage(chatId, messageId) {
    const deleteSQL = 'DELETE from messages WHERE chatId = ? AND messageId = ?';

    this.db.run(deleteSQL, [chatId, messageId], err => {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Row(s) deleted: ${this.changes}`);
    });
  }
}

module.exports = {
  MessagesBase
};
