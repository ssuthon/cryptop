let _ = require('lodash')
let axios = require('axios')
axios.defaults.headers.common['Cache-Control'] = 'no-cache'

let service = {

}

service.current = {bx: {eth: {}, btc: {}, bch:{}, ltc: {}, omg:{}, xrp:{}}}

setInterval(()=> {
    axios.get('https://bx.in.th/api/').then(response => {        
        if(response.data){
            let result = response.data
            _.each(_.values(result), item => {
                if(item.primary_currency == 'THB' && service.current.bx[item.secondary_currency.toLowerCase()] !== undefined){
                    service.current.bx[item.secondary_currency.toLowerCase()] = item
                }
            })
            service.current.lastUpdated = new Date()
        }
    })
}, 1000)

module.exports = service;