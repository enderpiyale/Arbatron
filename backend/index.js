'use strict';
console.time()
const ccxt = require('ccxt');
const user = require('./user');
const arbdata = require('./arbdata')

user.exchanges = [ccxt.binance, ccxt.huobipro, ccxt.bittrex, ccxt.kucoin]
const market = 'ETH/BTC'

async function userExchangesloadMarkets(market) {
    try{
        user.exchanges.forEach(async marketitem => {
            const exchangeItem = new marketitem ({ enableRateLimit: true })
            await exchangeItem.loadMarkets()
            const orderbook = await exchangeItem.fetchOrderBook(market)
            console.log (new Date(), exchangeItem.name, 'BUY:', orderbook.asks[0][0], 'SELL:', orderbook.bids[0][0])
        })
    }
    catch (error){
        if (error instanceof ccxt.NetworkError) {
            console.log (exchangeItem.id, 'fetchTicker failed due to a network error:', error.message)
        } else if (error instanceof ccxt.ExchangeError) {
            console.log (exchangeItem.id, 'fetchTicker failed due to exchange error:', error.message)
        } else {
            console.log (exchangeItem.id, 'fetchTicker failed with:', error.message)
        } 
    } 
}

userExchangesloadMarkets(market)
console.timeEnd()

