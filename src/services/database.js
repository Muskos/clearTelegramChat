const sqlite3 = require('sqlite3').verbose();
const util = require('util');
const { MessagesBase } = require('../datebase/messages');
const { SettingsBase } = require('../datebase/settings');

class Database {
  constructor() {
    this.db = new sqlite3.Database('./messages.db', err => {
      if (err) {
        console.error(err.message);
      }
    });

    this.db.run = util.promisify(this.db.run);
    this.db.get = util.promisify(this.db.get);
    this.db.all = util.promisify(this.db.all);

    this.messagesBase = new MessagesBase(this.db);

    this.saveMessage = this.messagesBase.saveMessage;
    this.getMessagesByChatId = this.messagesBase.getMessagesByChatId;
    this.getMessagesByTimeOut = this.messagesBase.getMessagesByTimeOut;
    this.getAllChatsId = this.messagesBase.getAllChatsId;
    this.deleteMessagesByChatId = this.messagesBase.deleteMessagesByChatId;
    this.deleteMessage = this.messagesBase.deleteMessage;
    this.getMessagesWithTimeOut = this.messagesBase.getMessagesWithTimeOut;
    this.getExpairedMessages = this.messagesBase.getExpairedMessages;

    this.settingsBase = new SettingsBase(this.db);
    this.saveSettings = this.settingsBase.saveSettings;
    this.getSettings = this.settingsBase.getSettings;
    this.getSettingsByChatId = this.settingsBase.getSettingsByChatId;
    this.updateSettings = this.settingsBase.updateSettings;
  }
}

const database = new Database();

module.exports = {
  database
};
