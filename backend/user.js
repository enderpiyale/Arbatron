require('dotenv').config();
const Api = require('./api')
const Transaction = require('./transaction')

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
        return tx
    }

    printTransactionHistory() {
        // this.transactions.forEach(tx => console.log(tx))
        this.transactions.forEach(printTransaction)
    } 
}

module.exports = User