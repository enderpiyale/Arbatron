
'use strict'

const ccxt = require ('ccxt')
    , log = require ('ololog')
    , asTable = require ('as-table')

;(async function main () {

    let kraken = new ccxt.kraken ({ enableRateLimit: true })
    await kraken.loadMarkets ()

    const markets = Object.values (kraken.markets).map (market => ({
        symbol: market.symbol,
        active: market.active,
        taker: market.taker,
        maker: market.maker,
        percentage: market.percentage
    }))

    log.bright.green.noLocate ('Markets:')
    log.green.noLocate (asTable (markets), '\n')

    const currencies = Object.values (kraken.currencies).map (currency => ({
        code: currency.code,
        active: currency.active,
        status: currency.status,
        fee: currency.fee
    }))

    log.bright.yellow.noLocate ('Currencies:')
    log.yellow.noLocate (asTable (currencies))

    let symbols = kraken.symbols
    console.log(symbols)

}) ()

