let _ = require('lodash')
let axios = require('axios')
axios.defaults.headers.common['Cache-Control'] = 'no-cache'

const currencies = ['eth', 'btc', 'bch', 'ltc', 'omg', 'xrp']

let service = {
    currencies
}

service.current = {bx: {}, cmc: {}}
_.each(currencies, currency => {
    service.current.bx[currency] = {}
    service.current.cmc[currency] = {}
})

setInterval(()=> {
    axios.get('https://bx.in.th/api/').then(response => {        
        extract_result(response.data, 'bx', (market, item) => {
            let currency = item.secondary_currency.toLowerCase()
            if(item.primary_currency == 'THB' && service.current[market][currency] !== undefined){
                return currency
            }
        })
        if(service.bxPriceUpdateHandler){
            service.bxPriceUpdateHandler()
        }
    })

    
    axios.get(`https://api.coinmarketcap.com/v1/ticker?convert=THB`).then(response => {
        extract_result(response.data, 'cmc', (market, item) => {
            let currency = item.symbol.toLowerCase()
            if(service.current[market][currency] !== undefined)
                return currency
        })
    })
    
}, 3000)

function extract_result(result, market, conditioner){
    _.each(_.values(result), item => {
        let currency = conditioner(market, item)
        if(currency){
            service.current[market][currency] = item
        }
    })
    service.current.lastUpdated = new Date()
}

module.exports = service;