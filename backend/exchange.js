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

module.exports = Exchange