require("dotenv").config();

const Bot = require("node-telegram-bot-api");
const path = require("path");

const commands = require("./utils/commands");
const { fetchFromAmazon, createKeywords } = require("./utils/puppeteer");
const { readFile } = require("./utils/fs");

const botOne = new Bot(process.env.BOT_TOKEN_ONE, { polling: true });
const botTwo = new Bot(process.env.BOT_TOKEN_TWO, { polling: true });

botOne.onText(/\/start/, async ({ chat }) => {
  if (chat.first_name === "no" || chat.last_name === "witness") {
    await botOne.sendMessage(chat.id, "Hello sir");
    botOne.setMyCommands(commands);
    return;
  }
  await botOne.sendMessage(chat.id, "demo server is running.");
});

botOne.onText(/\/set_keyword_amazon/, async ({ chat }) => {
  await botOne.sendMessage(chat.id, "send keywords");

  botOne.on("message", async ({ text }) => {
    if (!text) {
      await botOne.sendMessage(chat.id, "no/invalid keywrods provided");
    }
    botOne.removeAllListeners("message");
  });
});

console.log("bot is up");
