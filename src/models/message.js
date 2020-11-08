const TIMEOUT_HASHTAG = '#timeout';
const SPACE = ' ';
const MINUTE = 1000 * 60;

class Message {
  constructor(props) {
    const date = new Date();

    this.chatId = props.chat.id;
    this.messageId = props.message_id;
    this.createdAt = date.getTime();
    this.deleteAt = this.setDeleteAt(props);
  }

  setDeleteAt(props) {
    const currentDate = new Date();
    const timeoutPosition = props.text.indexOf(TIMEOUT_HASHTAG);

    if (timeoutPosition < 0) {
      return null;
    }

    let endTimeoutPostition = props.text.indexOf(SPACE, timeoutPosition);
    if (endTimeoutPostition < 0) {
      endTimeoutPostition = props.text.length;
    }

    const timeout = props.text.substring(
      timeoutPosition + (TIMEOUT_HASHTAG.length + 1),
      endTimeoutPostition
    );

    if (timeout) {
      return currentDate.getTime() + Number(timeout) * MINUTE;
    }
  }
}

module.exports = {
  Message
};
