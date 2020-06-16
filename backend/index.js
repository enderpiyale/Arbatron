require('dotenv').config();
// const ccxt = require('ccxt');

// (async function () {
//     const huobipro  = new ccxt.huobipro ()
//     const binance = new ccxt.binance ()
//     const idex = new ccxt.idex ()
//     const kucoin = new ccxt.kucoin ()
 
//     await huobipro.loadMarkets ()
//     await binance.loadMarkets ()
//     await idex.loadMarkets  ()
//     await kucoin.loadMarkets () 
 
//     //console.log (huobipro.id,    await huobipro.fetchOrderBook (huobipro.symbols[0]))
//     //console.log (idex.id,  await idex.fetchTicker ('SNTVT/ETH'))
//     //console.log (huobipro.id,  await huobipro.fetchTrades ('BTC/USDT'))
 
// }) ();

// const ccxt = require ('ccxt')
//     , log = require ('ololog')
//     , asTable = require ('as-table')

// ;(async function main () {

//     let kraken = new ccxt.kraken ({ enableRateLimit: true })
//     await kraken.loadMarkets ()

//     const markets = Object.values (kraken.markets).map (market => ({
//         symbol: market.symbol,
//         active: market.active,
//         taker: market.taker,
//         maker: market.maker,
//         percentage: market.percentage
//     }))

//     log.bright.green.noLocate ('Markets:')
//     log.green.noLocate (asTable (markets), '\n')

//     const currencies = Object.values (kraken.currencies).map (currency => ({
//         code: currency.code,
//         active: currency.active,
//         status: currency.status,
//         fee: currency.fee
//     }))

//     log.bright.yellow.noLocate ('Currencies:')
//     log.yellow.noLocate (asTable (currencies))

//     let symbols = kraken.symbols
//     console.log(symbols)

// }) ()

// const api = process.env.BINANCE_API_KEY
// console.log(api)

class Exchange {
    constructor (name){
        this.name = name
        this.users = []
        this.markets = []
        this.currencies = []
    }
    addMarket(market){
        this.markets.push(market)
    }

    addCurrency(currency){
        this.currencies.push(currency)
    }

    generateWallet(currency){
        const exchangeWallet = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        currency.wallets.push({exchangeName: this.name, wallet: exchangeWallet})
        
    }
        
}

class User {
    constructor(name, password = ''){
        this.name = name
        this.password = password
        this.transactions = []
        this.trades = []
        this.apis = []
    }
    registerToExchange(exchange, privKey, secretKey){
        const api = new Api(this, exchange, privKey, secretKey)
        this.apis.push(api)
        exchange.users.push(this)
    }
    createTransaction(sourceExchange, destinationExchange, currency, amount){
        const tx = new Transaction(this, sourceExchange, destinationExchange, currency, amount)
        this.transactions.push(tx)
    }
    
}

class Api {
    constructor(user, exchange, privKey, secretKey){
        this.user = user
        this.exchange = exchange
        this.privKey = privKey
        this.secretKey = secretKey
    }
}

class Currency {
    constructor(name){
        this.name = name
        this.wallets = []
    }

}

class Market {
    constructor(baseCurrency, quoteCurrency){
        this.symbol = baseCurrency.name + '/' + quoteCurrency.name
        this.base = baseCurrency.name
        this.quote = quoteCurrency.name
    }
}

class Transaction {
    constructor(user, sourceExchange, destinationExchange, currency, amount){
        this.timestamp = Date.now()
        this.user = user.name
        this.sourceExchange = sourceExchange.name
        this.destinationExchange = destinationExchange.name
        this.sourceWallet = Object.values(currency.wallets[0])[1]
        this.destinationWallet = Object.values(currency.wallets[1])[1]
        this.currency = currency.name
        this.amount = amount
        this.status = ''
    }
}

const binance = new Exchange('binance')
const kucoin = new Exchange('kucoin')
const ender = new User('ender')

ender.registerToExchange(binance, process.env.BINANCE_API_KEY, process.env.BINANCE_SECRET_KEY)

//Currency Definitions
const BTC = new Currency('BTC')
const ETH = new Currency('ETH')
const USDT = new Currency('USDT')

//Market Definitions
const BTCUSDT = new Market(BTC, USDT)
const ETHUSDT = new Market(ETH, USDT)
binance.addCurrency(BTC)
binance.addCurrency(ETH)
kucoin.addCurrency(BTC)
kucoin.addCurrency(ETH)

binance.addMarket(BTCUSDT)
binance.addMarket(ETHUSDT)

binance.generateWallet(BTC)
binance.generateWallet(ETH)
kucoin.generateWallet(BTC)
kucoin.generateWallet(ETH)

// console.log(binance)
// console.log(binance.currencies)

ender.createTransaction(binance, kucoin, BTC, 100)

console.log(ender.transactions)

// console.log(BTC)