const { QUERY } = require('../constants/query');

class MessagesBase {
  constructor(db) {
    this.db = db;
    this.db.run(QUERY.CREATE_MESSAGES_BD);
  }

  saveMessage(message) {
    this.db.run(QUERY.INSERT_MESSAGE, [
      message.chatId,
      message.messageId,
      message.createdAt,
      message.deleteAt
    ]);
  }

  async getMessagesByChatId(chatId) {
    const messages = await this.db.all(QUERY.SELECT_BY_CHAT_ID, [chatId]);

    return messages;
  }

  async getMessagesByTimeOut(chatId, timeout) {
    const messages = await this.db.all(QUERY.SELECT_BY_TIMEOUT, [chatId]);

    return messages.filter(item => {
      const currentDate = new Date();
      const timestampToDelete = currentDate.getTime() - timeout * 1000 * 60;

      return item.createdAt < timestampToDelete && timeout > 0;
    });
  }

  async getMessagesWithTimeOut() {
    const messages = await this.db.all(QUERY.SELECT_WITH_TIMEOUT);

    return messages.filter(item => {
      const currentDate = new Date();
      const timestampToDelete = currentDate.getTime();

      return Number(item.deleteAt) < timestampToDelete;
    });
  }

  async getAllChatsId() {
    const chatsId = await this.db.all(QUERY.GET_CHAT_ID);
    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    return chatsId.map(item => item.chatId).filter(onlyUnique);
  }

  async getExpairedMessages() {
    const currentDate = new Date();
    const timestampToDelete = currentDate.getTime() - 1000 * 60 * 60 * 47;
    const messages = await this.db.all(QUERY.SELECT_EXPIRED_MESSAGES, [
      timestampToDelete
    ]);

    return messages;
  }

  deleteMessagesByChatId(chatId) {
    this.db.run(QUERY.DELETE_BY_CHAT_ID, [chatId]);
  }

  deleteMessage(chatId, messageId) {
    this.db.run(QUERY.DELETE_MESSAGE, [chatId, messageId]);
  }
}

module.exports = {
  MessagesBase
};
