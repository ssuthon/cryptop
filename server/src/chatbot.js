const TelegramBot = require('node-telegram-bot-api');
const token = require('./secret.json').telegramBotToken;

const bot = new TelegramBot(token, {polling: true});
bot.on('message', (msg) => {    
    console.log(JSON.stringify(msg, null, 4))
})