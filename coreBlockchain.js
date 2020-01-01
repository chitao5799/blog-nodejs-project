
const SHA256 = require('crypto-js/sha256')
var prettyjson = require('prettyjson')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

function Transaction(fromAdress, toAdress, amount) {
	this.fromAdress = fromAdress
	this.toAdress = toAdress
	this.amount = amount
}

Transaction.prototype.calculateHash = function() {
	var encoded=SHA256(this.fromAdress + this.toAdress + this.amount).toString();
	// console.log('sha256 transaction:',encoded);//chuỗi string
	return encoded;
}

Transaction.prototype.signTransaction = function(signingKey) {
	if(signingKey.getPublic('hex') !== this.fromAdress) {
		throw new Error('you cannot sign transaction for other wallet')
	}
	//signingKey.getPublic('hex') và this.fromAdress đều được tạo ra từ 1 kiểu - là 1 chuỗi string
			// console.log('signingKey.getPublic(hex)=',signingKey.getPublic('hex'));
			// console.log('this.fromAdress=',this.fromAdress);
	const hashTx = this.calculateHash()
	// console.log('hashTx=',hashTx);//chuỗi string sha256
	const sig = signingKey.sign(hashTx, 'base64')
	//			<KeyPair{ }>.sign(< an array or a hex-string>)
	// console.log('sig=',sig); // là Signature { }
	// console.log('sig.toDER(hex)=',sig.toDER('hex')); //một chuỗi string dài
	this.signature = sig.toDER('hex')
}

Transaction.prototype.isValid = function() {
	if(!this.fromAdress) {
		return true
	}

	if(!this.signature || this.signature.length === 0) {
		throw new Error('No signature in this transaction')
	}

	const publicKey = ec.keyFromPublic(this.fromAdress, 'hex') //trả về KeyPair{ }
			// console.log(' ec.keyFromPublic(this.fromAdress, hex)=', ec.keyFromPublic(this.fromAdress, 'hex'));
			// console.log('publicKey.verify(this.calculateHash(), this.signature)=',publicKey.verify(this.calculateHash(), this.signature));//true
	return publicKey.verify(this.calculateHash(), this.signature)//true
	// <KeyPair{ }>.verify(<chuỗi hash>,<chuỗi-đã-sign.toDER()>)
}



function Block(timestamp, transactions, previousHash) {
	this.timestamp = timestamp
	this.transactions = transactions
	this.previousHash = previousHash
	this.hash = this.calculateHash()
	this.nonce = 0
}

Block.prototype.calculateHash = function() {
	return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString()
}

Block.prototype.mineBlock = function(difficulty) {
	//log("2w0001qw2e34r".substring(0, 6));//2w0001  |;| //log(Array(4+1).join("0")) //0000
	while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
		this.nonce++
		this.hash = this.calculateHash()
	}

	console.log("Block is mined: ", this.hash)
}

Block.prototype.hasValidTransactions = function() {

	for(const tx of this.transactions) {
		if(!tx.isValid()) {
			return false
		}
	}

	return true
}


function BlockChain() {
	this.chain = [this.createGenesisBlock()]
	this.difficulty = 2
	this.pendingTransactions = []
	this.miningReward = 100
}

BlockChain.prototype.createGenesisBlock = function() {
	return new Block(0, "11/23/2019", "Genesis Block", "0")
}

BlockChain.prototype.getLastBlock = function() {
	return this.chain[this.chain.length - 1]
}

BlockChain.prototype.minePendingTransactions = function(miningRewardAdress) {
	let block = new Block(Date.now(), this.pendingTransactions)
	block.previousHash = this.getLastBlock().hash
	block.mineBlock(this.difficulty)

	this.chain.push(block)

	this.pendingTransactions = [new Transaction(null, miningRewardAdress, this.miningReward)]
}

BlockChain.prototype.addTransaction = function(transaction) {
	// cai nay de kiem tra khi tao 1 transaction , khac voi trans dc tao ra khi mine block
	if(!transaction.fromAdress || !transaction.toAdress) {
		throw new Error('Transaction must include from and to address')
	}

	if(!transaction.isValid()) {
		throw new Error('Cannot add invalid transaction')
	}
	this.pendingTransactions.push(transaction)
}

BlockChain.prototype.getBalanceOfAdress = function(address) {
	//tính số tiền hiện có của address
	let balance = 0

	for(const block of this.chain) {
		for(const tran of block.transactions) {
			if(tran.fromAdress === address) {
				balance -= tran.amount
			}

			if(tran.toAdress === address) {
				balance += tran.amount
			}
		}
	}

	return balance
}

BlockChain.prototype.isChainValid = function() {
	for(let i = 1; i < this.chain.length; i++) {
		const curentBlock = this.chain[i]
		const previousBlock = this.chain[i-1]

		if(!curentBlock.hasValidTransactions()) {
			return false
		}

		if(curentBlock.hash !== curentBlock.calculateHash()) {
			return false
		}
		if(curentBlock.previousHash !== previousBlock.hash) {
			return false
		}
	}
	return true
}

var blockChain = new BlockChain()

const myKey = ec.keyFromPrivate('4e00b349cfe0ac430ba3788020ab2a44850ee66d2f5b49d69c4ff9093a1687e4')
const myWalletAdress = myKey.getPublic('hex')
// console.log('mykey là:',myKey);// trả về KeyPair{ }
// console.log('dưới my key là:',myWalletAdress);//trả về chuỗi string
var tx1 = new Transaction(myWalletAdress, 'tuan mom', 10)
tx1.signTransaction(myKey)

blockChain.addTransaction(tx1)

console.log('mining...')

blockChain.minePendingTransactions(myWalletAdress)

// blockChain.minePendingTransactions('abc')
//----------

// console.log('balance of hoannc is: ', blockChain.getBalanceOfAdress(myWalletAdress))

// console.log('is chain valid ? ', blockChain.isChainValid())
//  console.log(myKey)

// var arr1 = [{"name" : "hoan", "age": 1},{"name" : "a", "age": 2}]
// var arr2 = [{"name" : "hoan", "age": 1},{"name" : "a", "age": 1}]
// console.log(JSON.stringify(arr1)===JSON.stringify(arr2))
