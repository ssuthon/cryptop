
const TelegramBot = require('node-telegram-bot-api');
const token = require('./secret.json').telegramBotToken;
const db = require('./db')
const stats = require('./stats')
const _ = require('lodash')

stats.bxPriceUpdateHandler = function(){
    _.each(db.get('chats').value(), chat => {
        //console.log(chat.id)
        _.each(chat.lowerTriggers, (values, currency) => {            
            let current_price = stats.current.bx[currency].last_price
            //console.log(currency, " => ", values, " == ", current_price)
            chat.lowerTriggers[currency] = _.filter(values, v => {
                if(current_price <= v){
                    bot.sendMessage(chat.id, `${currency} <= ${v}, now is ${current_price}`)
                    return false
                }
                return true
            })
        })

        _.each(chat.upperTriggers, (values, currency) => {
            let current_price = stats.current.bx[currency].last_price
            //console.log(currency, " => ", values, " == ", current_price)
            chat.upperTriggers[currency] = _.filter(values, v => {
                if(current_price >= v){
                    bot.sendMessage(chat.id, `${currency} >= ${v}, now is ${current_price}`)
                    return false
                }
                return true
            })
        })
        db.set(`chats.c${chat.id}`, chat).write()
    })
}

const bot = new TelegramBot(token, {polling: true});

let command_re = new RegExp(`\.(${stats.currencies.join('|')})(.*)`)
bot.on('message', (msg) => {    
    //console.log(JSON.stringify(msg, null, 4))
    let result = command_re.exec(msg.text)
    if(result){
        try{
            let currency = result[1]
            let data_ref = `chats.c${msg.chat.id}`
            let data = db.find(data_ref).value() || {
                id: msg.chat.id,
                lowerTriggers: {},
                upperTriggers: {}
            }     
                 
            data.lowerTriggers[currency] = []
            data.upperTriggers[currency] = []

            
            let items = _.map(result[2].trim().split(' '), item => _.toNumber(item))
            let current_price = stats.current.bx[currency].last_price
            
            _.each(items, item => {
                if(current_price > item){                    
                    data.lowerTriggers[currency].push(item)
                }else{
                    data.upperTriggers[currency].push(item)
                }
            })            

            db.set(data_ref, data).write()

            bot.sendMessage(msg.chat.id, 'roger that')
        }catch(e){
            console.log(e)
        }
    }
})