class Message {
  constructor(props) {
    this.id = props.id;
    this.chatId = props.chatId;
    this.messageId = props.messageId;
    this.createdAt = props.createdAt;
  }
}

module.exports = {
  Message
};
