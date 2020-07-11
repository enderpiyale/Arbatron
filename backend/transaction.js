class Transaction {
    constructor(user, sourceExchange, destinationExchange, currency, amount){
        this.timestamp = Date.now()
        this.user = user.name
        this.sourceExchange = sourceExchange.name
        this.destinationExchange = destinationExchange.name
        this.sourceWallet = currency.wallets.find(record => record['exchangeName'] == sourceExchange.name).wallet
        this.destinationWallet = currency.wallets.find(record => record['exchangeName'] == destinationExchange.name).wallet
        this.currency = currency.name
        this.amount = amount
        this.status = ''
    }
    
}


module.exports = Transaction