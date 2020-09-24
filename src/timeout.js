const { clear, saveMessageId } = require('./clear')
const COMMAND_NAME = '/timeout'

let intervalId

const intervalFunc = (ctx) => {
    saveMessageId(ctx)
    clear(ctx)
}

const setTimer = async (ctx) => {
    const timer = Number(ctx.message.text.substring(9));
    if (isNaN(timer)) {
        return
    }
    if (timer === 0) {
        clearInterval(intervalId)
    } else {
        clearInterval(intervalId)
        intervalId = setInterval(() => intervalFunc(ctx), timer * 1000 * 60);
    }
}

module.exports = Object.assign({}, {
    setTimer
})