require('dotenv').config();
const ccxt = require('ccxt');
const Api = require('./api')
const Transaction = require('./transaction')

class User {
    constructor(name, password = ''){
        this.name = name
        this.password = password
        this.exchanges = []
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
        this.transactions.forEach(this.printTransaction)
    } 

    printTransaction(transaction){
        console.log(`${transaction.user} transfered ${transaction.amount} ${transaction.currency} from ${transaction.sourceExchange} wallet ${transaction.sourceWallet} to ${transaction.destinationExchange} wallet ${transaction.destinationWallet}`)
    }
}

module.exports = User