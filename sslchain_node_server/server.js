var express = require('express');
var app = express();
var https = require('https');
var fs = require('fs');
var Buffer = require('buffer');
var Web3 = require('web3');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;
var EthereumTx = require('ethereumjs-tx');

var key = fs.readFileSync('/etc/letsencrypt/live/nbchain.fr/privkey.pem');
var cert = fs.readFileSync( '/etc/letsencrypt/live/nbchain.fr/fullchain.pem' );
var ca = fs.readFileSync( './intermediate.crt' );

var options = {
  key: key,
  cert: cert,
  ca: ca
};

var server = https.createServer(options, app);
var io = require('socket.io').listen(server);

// HTTP provider
var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/N0eEaWzEOw2HT8wv3qjC"));

// Account and contract settings
var settings = fs.readFileSync('settings.json');
var set = JSON.parse(settings);

var account = set.account;
var pKey = set.pkey;
var privateKey = Buffer.Buffer.from(pKey, 'hex');
var contractAddress = set.address;
var interface = set.interface;
var contract = web3.eth.contract(interface).at(contractAddress);

// Transaction options
var gasPrice = web3.eth.gasPrice;
var gasPriceHex = web3.toHex(gasPrice);
var gasLimitHex = web3.toHex(4000000);
var nonce = web3.eth.getTransactionCount(account);
var txOptions = {
    nonce: nonce,
    gasPrice: gasPriceHex,
    gasLimit: gasLimitHex,
    to: contractAddress
};


io.sockets.on('connection', function(socket) {
	console.log("Client connected");

	socket.on('newCertificate', function(data) {
		console.log('Certificate to register: ' + data.domain);
		var dom = data.domain;
		var date = (new Date(new Date().setMonth(new Date().getMonth() + 2))).getTime() / 1000;
		var code = data.code;
		var rawTx = txutils.functionTx(interface, 'newCertificate', [dom, date, code], txOptions);
		var transaction = new EthereumTx(rawTx);
		transaction.sign(privateKey);
		var serializedTx = transaction.serialize().toString('hex');
		var hashtx = web3.eth.sendRawTransaction(
		    '0x' + serializedTx, function (err, hash) {
		        if (err) {
		            callback(err);
		        } else {
		            console.log("Certificate hash : " + hash);
		        }
		    }
		);
		console.log("Certificate waiting to be mined.");
	});
	
	socket.on('getCertificate', function(data) {
		console.log(data.domain + " certificate requested.");
		var c = contract.certificates(data.domain);
		socket.emit('sendCertificate', { domain: data.domain, date: c[0], code: c[1]});
	});

});


server.listen(3927);
