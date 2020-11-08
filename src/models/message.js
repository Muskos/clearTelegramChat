class Message {
  constructor(props) {
    const date = new Date();

    this.id = null; // TODO
    this.chatId = props.chat.id;
    this.messageId = props.message_id;
    this.createdAt = date.getTime();
    this.deleteAt = this.setDeleteAt(props);
  }

  setDeleteAt(props) {
    const currentDate = new Date();
    const timeoutPosition = props.text.indexOf('#timeout');

    if (timeoutPosition < 0) {
      return null;
    }

    let endTimeoutPostition = props.text.indexOf(' ', timeoutPosition);
    if (endTimeoutPostition < 0) {
      endTimeoutPostition = props.text.length;
    }

    const timeout = props.text.substring(
      timeoutPosition + 8,
      endTimeoutPostition
    );

    if (timeout) {
      return currentDate.getTime() + Number(timeout) * 1000 * 60;
    }
  }
}

module.exports = {
  Message
};
