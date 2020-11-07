const { clear, saveMessageId } = require('./clear');

const TIME_OUT = 1000;
let intervalId;

const intervalFunc = (ctx, timer) => {
  clear(ctx, timer);
};

const setTimer = async ctx => {
  const timer = Number(ctx.message.text.substring(9));

  saveMessageId(ctx);

  if (isNaN(timer)) {
    return;
  }
  if (timer === 0) {
    clearInterval(intervalId);
  } else {
    clearInterval(intervalId);
    intervalId = setInterval(() => intervalFunc(ctx, timer), TIME_OUT);
  }
};

module.exports = Object.assign(
  {},
  {
    setTimer
  }
);
