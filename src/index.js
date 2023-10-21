const Bot = require("node-telegram-bot-api")

const bot = new Bot("6637798896:AAFLZ9mMqnbfpdrSEda1CUsvBIn_s4Gjr0Y", { polling: true })

bot.onText(/\/start/, (ctx) => {
  bot.sendMessage(ctx.chat.id, "ohhh ho")
})
console.log("bot is up");
