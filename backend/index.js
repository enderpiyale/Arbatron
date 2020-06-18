
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

const Exchange = require('./exchange')
const User = require('./user')
const Currency = require('./currency')
const Market = require('./market')

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
binance.generateWallet(USDT)
kucoin.generateWallet(USDT)

const TX1 = ender.createTransaction(binance, kucoin, BTC, 100)
const TX2 = ender.createTransaction(kucoin, binance, ETH, 200)
const TX3 = ender.createTransaction(binance, kucoin, USDT, 500)

// console.log(ender.transactions)
// console.log(BTC.wallets)

TX1.printTransaction()
TX2.printTransaction()
TX3.printTransaction()

ender.printTransactionHistory()