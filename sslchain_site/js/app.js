var Buffer = require('buffer');
var Web3 = require('web3');
var lightwallet = require('eth-lightwallet');
var txutils = lightwallet.txutils;
var EthereumTx = require('ethereumjs-tx');

var account = "";
var pkey = "";
var address = "0x9031669dD6D8Bb3159071bc0142527e696C849b4";
var interface = [ { "constant": true, "inputs": [ { "name": "", "type": "bytes32" } ], "name": "certificates", "outputs": [ { "name": "validity_date", "type": "uint256" }, { "name": "cert", "type": "string" }, { "name": "flag", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "dom", "type": "bytes32" }, { "name": "date", "type": "uint256" }, { "name": "cert", "type": "string" } ], "name": "newCertificate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "numCertificate", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ];
	 			 
// HTTP provider
var web3 = new Web3(new Web3.providers.HttpProvider("https://kovan.infura.io/N0eEaWzEOw2HT8wv3qjC"));

// Account settings
var account = account;
var pKey = pkey;
var privateKey = Buffer.Buffer.from(pKey, 'hex');

// Contract settings
var contractAddress = address;
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

window.createCertificate = function() {
    var dom = $("#domain").val();
    var date = (new Date(new Date().setMonth(new Date().getMonth() + 2))).getTime() / 1000;
    var code = $("#code_certificat").val();
    var rawTx = txutils.functionTx(interface, 'newCertificate', [dom, date, code], txOptions);
    var transaction = new EthereumTx(rawTx);
    transaction.sign(privateKey);
    var serializedTx = transaction.serialize().toString('hex');
    var hashtx = web3.eth.sendRawTransaction(
        '0x' + serializedTx, function (err, hash) {
            if (err) {
                callback(err);
            } else {
                alert("Certificate hash : " + hash);
            }
        }
    );
    alert("Certificate waiting to be mined.");
}

window.getCertificates = function() {
    var c = contract.certificates("nbchain.fr");
    $("#cert_dom0").html("nbchain.fr");
    if (c[0] == 0) {
	$("#cert_code0").html("No certificate found for this domain.");
    }
    else {
        var d = new Date(c[0] * 1000);
 	var month = 1 + d.getMonth();
	$("#cert_date0").html(d.getDate() + "/" + month + "/" + d.getFullYear());
	$("#cert_code0").html(c[1]);
    }
}

window.requestCertificate = function() {
    var dom = $("#domain2").val();
    var c = contract.certificates(dom);
    $("#cert_dom1").html(dom);
    if (c[0] == 0) {
	$("#cert_date1").html("");
	$("#cert_code1").html("No certificate found for this domain.");
    }
    else {
	var d = new Date(c[0] * 1000);
 	var month = 1 + d.getMonth();
	$("#cert_date1").html(d.getDate() + "/" + month + "/" + d.getFullYear());
	var code = c[1].replace(/\n/g, "</br>");
	$("#cert_code1").text(c[1]);
    }
}
