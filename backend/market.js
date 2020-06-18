class Market {
    constructor(baseCurrency, quoteCurrency){
        this.symbol = baseCurrency.name + '/' + quoteCurrency.name
        this.base = baseCurrency.name
        this.quote = quoteCurrency.name
    }
}

module.exports = Market